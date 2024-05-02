import {
  Bytes,
  JSONValue,
  JSONValueKind,
  TypedMap,
  json,
  ByteArray,
} from '@graphprotocol/graph-ts';
import { NewPost } from '../../generated/Poster/Poster';
import { Dao, Record } from '../../generated/schema';

class JsonStringResult {
  data: string;
  error: string;
}
class JsonResult {
  object: TypedMap<string, JSONValue>;
  error: string;
}

export function getResultFromJson(content: string): JsonResult {
  let result: JsonResult;
  result.error = 'none';
  let bytes = changetype<Bytes>(ByteArray.fromUTF8(content));

  // let jsonResult = json.try_fromBytes(ByteArray.fromUTF8(content) as Bytes);
  let jsonResult = json.try_fromBytes(bytes);

  if (jsonResult.isError) {
    result.error = 'Failed to parse JSON';
    return result;
  }
  result.object = jsonResult.value.toObject();
  return result;
}

export function getStringFromJson(
  object: TypedMap<string, JSONValue>,
  key: string
): JsonStringResult {
  let result: JsonStringResult;
  result.error = 'none';
  let value = object.get(key);

  if (!value || value.kind != JSONValueKind.STRING) {
    result.error = 'Missing valid Poster field: ' + key;
    return result;
  }
  result.data = value.toString();
  return result;
}

export function getObjectFromJson(
  object: TypedMap<string, JSONValue>,
  key: string
): JsonResult {
  let result: JsonResult;
  result.error = 'none';
  let value = object.get(key);

  if (!value || value.kind != JSONValueKind.OBJECT) {
    result.error = 'Missing valid Poster field: ' + key;
    return result;
  }
  result.object = value.toObject();
  return result;
}

export function createDaoProfileSummoning(
  object: TypedMap<string, JSONValue>,
  daoAddress: Bytes | null,
  event: NewPost
): boolean {
  if (daoAddress === null) {
    return false;
  }
  const entityId = daoAddress.toHexString().concat('-record-summon');

  const entity = new Record(entityId);

  const name = getStringFromJson(object, 'name');
  if (name.error != 'none') {
    return false;
  }

  entity.createdAt = event.block.timestamp;
  entity.createdBy = daoAddress;
  entity.dao = daoAddress.toHexString();
  entity.tag = event.params.tag;
  entity.table = 'daoProfile';
  entity.contentType = 'json';
  entity.content = event.params.content;

  entity.save();

  return true;
}

export function createDaoProfile(
  object: TypedMap<string, JSONValue>,
  event: NewPost
): boolean {
  const daoId = getStringFromJson(object, 'daoId');
  if (daoId.error != 'none') {
    return false;
  }

  const dao = Dao.load(daoId.data);
  if (!dao) {
    return false;
  }

  const name = getStringFromJson(object, 'name');
  if (name.error != 'none') {
    return false;
  }

  dao.name = name.data;
  dao.save();

  const entityId = dao.id
    .concat('-record-')
    .concat(event.block.timestamp.toString())
    .concat(event.logIndex.toString());

  const entity = new Record(entityId);

  entity.createdAt = event.block.timestamp;
  entity.createdBy = event.params.user;
  entity.dao = dao.id;
  entity.tag = event.params.tag;
  entity.table = 'daoProfile';
  entity.contentType = 'json';
  entity.content = event.params.content;

  entity.save();

  return true;
}

export function createDaoSignal(
  object: TypedMap<string, JSONValue>,
  event: NewPost
): boolean {
  const daoId = getStringFromJson(object, 'daoId');
  if (daoId.error != 'none') {
    return false;
  }

  const dao = Dao.load(daoId.data);
  if (!dao) {
    return false;
  }

  const entityId = daoId.data
    .concat('-record-')
    .concat(event.block.timestamp.toString())
    .concat(event.logIndex.toString());

  const entity = new Record(entityId);

  entity.createdAt = event.block.timestamp;
  entity.createdBy = event.params.user;
  entity.dao = daoId.data;
  entity.tag = event.params.tag;
  entity.table = 'signal';
  entity.contentType = 'json';
  entity.content = event.params.content;

  entity.save();

  return true;
}

export function createDaoDatabaseRecord(
  object: TypedMap<string, JSONValue>,
  event: NewPost
): boolean {
  const daoId = getStringFromJson(object, 'daoId');
  if (daoId.error != 'none') {
    return false;
  }

  const dao = Dao.load(daoId.data);
  if (!dao) {
    return false;
  }

  const entityId = dao.id
    .concat('-record-')
    .concat(event.block.timestamp.toString())
    .concat(event.logIndex.toString());

  const entity = new Record(entityId);

  entity.createdAt = event.block.timestamp;
  entity.createdBy = event.params.user;
  entity.dao = dao.id;
  entity.tag = event.params.tag;
  entity.contentType = 'json';
  entity.content = event.params.content;

  // connect to parent record - for comments
  const parentId = getStringFromJson(object, 'parentId');
  if (parentId.error == 'none') {
    entity.parentId = parentId.data;
  }

  const table = getStringFromJson(object, 'table');
  if (table.error != 'none') {
    return false;
  }
  entity.table = table.data;

  const queryType = getStringFromJson(object, 'queryType');
  if (queryType.error != 'none') {
    return false;
  }
  entity.queryType = queryType.data;

  entity.save();

  return true;
}
