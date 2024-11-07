// Step.jsx
import React from 'react';
import { Popover, Steps } from 'antd';

export const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        Step {index + 1} status: {status}
      </span>
    }
  >
    <div
      className={`flex justify-center items-center w-[3rem] h-[3rem] rounded-full font-nunito ${
        status === 'finish' ? 'bg-[#9C81CC]' : 'bg-gray-300'
      } text-white font-bold text-lg px-4` } 
    >
      {index + 1}
    </div>
  </Popover>
);

export const Stepper = ({ current }) => (
  <Steps
    current={current+1}
    progressDot={customDot}
    className="custom-stepper"
    items={[
      { title: 'Register' },
      { title: 'Take Survey' }
    ]}
  />
);
