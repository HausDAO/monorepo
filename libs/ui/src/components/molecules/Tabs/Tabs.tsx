import { useReducer } from 'react';
import type { Action, State, Tab } from './Tabs.types';
import { TabLink, TabsContainer, TabLinks } from './Tabs.styles';

// TODO: REFACTOR TO USE RADIX TABS

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'selected':
      return {
        selected: action.payload,
      };
    default:
      return state;
  }
}

interface TabsInterface {
  tabList: Tab[];
}

export const Tabs = ({ tabList }: TabsInterface) => {
  const [{ selected }, dispatch] = useReducer(reducer, {
    selected: 0,
  });

  const TabsContent = tabList && tabList.find((_, index) => index === selected);

  return (
    <TabsContainer>
      <TabLinks className="nav-link-list">
        {tabList.map((tab, index) => (
          <TabLink
            key={tab.label}
            role="tab"
            tabIndex={selected === index ? 0 : -1}
            className={selected === index ? 'selected' : ''}
            onClick={() => dispatch({ type: 'selected', payload: index })}
          >
            {tab.label}
          </TabLink>
        ))}
      </TabLinks>

      <div className="tab-content">
        <div className="tab-panel" role="tabpanel">
          {TabsContent && <TabsContent.Component />}
        </div>
      </div>
    </TabsContainer>
  );
};
