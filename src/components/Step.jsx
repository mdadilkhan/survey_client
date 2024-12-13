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
      className={`flex justify-center items-center w-[4rem] h-[4rem] rounded-full font-nunito ${
        status === 'finish' ? 'bg-[#34C759]' : 'bg-[#9C81CC]'
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
    className="custom-stepper w-[20rem]"
    items={[
      { title: 'Register' },
      { title: 'Take Survey' }
    ]}
  />
);
