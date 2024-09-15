/* eslint-disable react/no-danger */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";


import DropDown from "./dropdown";
import UsePlan from "../service/use-plan";
import DOMPurify from "dompurify";
import {
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
  } from "@material-tailwind/react";

  
const createMarkup = (html) => {
  const sanitizedHtml = DOMPurify.sanitize(html);
  return { __html: sanitizedHtml };
};

const Plan = () => {
  const { slug } = useParams(); // استفاده از useParams داخل کامپوننت
  const [activeTab, setActiveTab] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { data, isLoading } = UsePlan();

  useEffect(() => {
    if (data && data.length > 0) {
      setActiveTab(data[0].Title); // تنظیم اولین تب به صورت پیش‌فرض
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleButtonClick = (content) => {
    setSelectedItem(content.Name);
  };

;

  return (
    <div className="mx-auto py-40 min-h-screen flex items-center justify-center">
      <div
        dir="rtl"
        className="flex flex-col items-center rounded-lg md:max-w-8xl w-full h-auto bg-white p-8"
      >
        {data ? (
          <Tabs value={activeTab}>
            <TabsHeader
              className="max-w-5xl mx-auto rounded-none bg-transparent flex justify-center"
              indicatorProps={{
                className:
                  "bg-transparent border-b-2 border-indigo-600 shadow-none rounded-none",
              }}
            >
              {data.map((tab, index) => (
                <Tab
                  key={index}
                  value={tab.Title}
                  onClick={() => setActiveTab(tab.Title)}
                  id={tab.Title}
                  className={
                    activeTab === tab.Title
                      ? "text-indigo-600 pb-2 md:text-base text-xs"
                      : "text-gray-500 pb-2 md:text-base text-xs"
                  }
                >
                  {tab.Title}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
              className="max-w-8xl mx-auto"
            >
              {data.map((tab, index) => (
                <TabPanel key={index} index={tab.Title} value={tab.Title}>
                  <div
                    className="text-black p-4 rounded-lg bg-gray-100 shadow-inner"
                    dangerouslySetInnerHTML={createMarkup(tab.Summer)}
                  />
                  <DropDown tab={tab} index={index} />
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        ) : (
          <div>Loading...</div>
        )}

        <div className="mt-8 flex flex-col items-center  md:mt-0">
         کارتتتتتت
        </div>
      </div>
    </div>
  );
};

export default Plan;
