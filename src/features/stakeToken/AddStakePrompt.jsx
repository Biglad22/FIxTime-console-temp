import React, { useState } from "react";
import { CustomBtn } from "../../components/Buttons/FilledBtn";
import { Psychiatry } from "../../assets/icon/Psychiatry";
import { RequestProcessing } from "../requestProcessing/RequestProcessing";

const StakeFLXT = ({className='', balance='4,206', close}) => {
  const [amount, setAmount] = useState("");
  const [lockDuration, setLockDuration] = useState("");
  const [isProcessing, setProcessing] = useState(false);


  const handleSubmit = () => {
    setProcessing(true);
    // Add your staking logic here
  };

  return (
    <div className={`bg-[#2F2F2F] px-4 py-6 rounded-radius ${className} select-none`}>
        <div className="flex justify-between items-center w-full mb-2 ">
          <h6 className=" text-accent text-base font-semibold leading-none">Stake $FLXT</h6>
          <CustomBtn icon="bx-x" className="text-6xl text-accent" onClick={close} />
        </div>
        <p className="text-low mb-4 text-sm">You are about to lock $FLXT.</p>
        <div className="mb-8">
          <div className={`flex items-center bg-high rounded-md px-3 py-2 font-bold ${
                  isProcessing? 'opacity-50' : 'opacity-100'
                }`}>

            <Psychiatry fill="#262626" />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent w-full outline-none text-base text-surface placeholder:text-surface appearance-none focus:appearance-none hover:appearance-none ml-2"
              placeholder="0.00"
            />
            <span className="text-surface ml-2">
              $FLXT
            </span>

          </div>
          <p className="text-medium mt-2 text-xs">Available:{` ${balance}`}</p>
        </div>
        <div className="mb-8">
          <h6 className="block text-gray-300 mb-2 text-base font-medium">Lock Duration</h6>
          <div className="flex items-center flex-wrap flex-1 gap-2">
            {["3 months", "6 months", "1 year", "2 years"].map((duration) => (
              <CustomBtn
                key={duration}
                title={duration}
                onClick={() => setLockDuration(duration)}
                
                className={`py-2 px-4 rounded-radius font-bold text-white text-base ${
                  lockDuration === duration
                    ? "bg-[#2C8E97] border border-high"
                    : "bg-none border border-[#2C8E97]"
                } ${
                  isProcessing? 'opacity-50' : 'opacity-100'
                }`} 
              />
            ))}
          </div>
        </div>

        <CustomBtn title='Submit to staking' icon="bx-right-arrow-alt" onClick={handleSubmit} right 
          disabled={amount === '' || lockDuration === '' || isProcessing}
          className="w-full bg-accent opacity-100 disabled:opacity-50 text-surface py-3 px-4 my-6 rounded-radius font-bold text-sm"
        />

        {isProcessing && <RequestProcessing />}
      </div>
  );
};

export default StakeFLXT;
