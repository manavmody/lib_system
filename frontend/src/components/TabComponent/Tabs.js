import React, { useEffect, useState } from "react";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import Books from "../Tabs/Books";
import Transactions from "../Tabs/Transactions";
import BooksAdded from "../Tabs/BooksAdded";
import Members from "../Tabs/Members";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
 
  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem title="Books" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Members" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Books Added" id="tab4" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Transactions" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
        
      </ul>
 
      <div className="outlet">  
      
        <TabContent id="tab1" activeTab={activeTab}>
        <Books/>
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
        <Members/>
        </TabContent>
        <TabContent id="tab4" activeTab={activeTab}>
        <BooksAdded />
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
        <Transactions/>
        </TabContent>
      
      </div>
    </div>
  );
};
 
export default Tabs;