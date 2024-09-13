import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HugeiconsMoneyReceiveCircle,
  HugeiconsMoneySendCircle,
  LogosBitcoin,
  IonTime,
} from "../assets/icons.jsx";
import SimpleGraph from "./SimpleGraph.jsx";

const Home = () => {
  const [txHash, setTxHash] = useState("");
  const [txDetails, setTxDetails] = useState(null);

  const getTxDetails = () => {
    const apiEndpoint = `https://blockchain.info/rawtx/${txHash}`;
    fetch(apiEndpoint)
      .then((res) => res.json())
      .then((data) => setTxDetails(data))
      .catch((err) => console.error(err));
  };

  const getTotalBitcoinTransferred = (details) => {
    if (!details) return 0;
    return (
      details.out.reduce((total, output) => total + output.value, 0) / 100000000
    );
  };

  const Card = ({ Label, Value, ImageSrc }) => {
    return (
      <>
        <div className="p-2 rounded flex flex-col justify-center items-center bg-slate-950">
          <h4 className="text-3xl text-sky-400 leading-loose">{Label}</h4>
          <p>{Value}</p>
          {ImageSrc}
        </div>
      </>
    );
  };

  return (
    <>
      <main className="bg-gray-950 min-h-screen font-sans">
        <section id="home" className="bg-black border-b border-gray-700">
          <h1 className="text-4xl text-white p-4">Crypto flow</h1>
        </section>

        <section>
          <h2 className="text-7xl text-white w-4/5 leading-tight tracking-tight mx-auto p-12">
            Analyse & Track Crypto Currencies transactions back to Source
          </h2>
        </section>

        {/* <section id="about" className="">
          <img src={CryptoImg} alt="Crypto currencies" className='w-1/3 mx-auto h-60 mt-20' />
        </section> */}

        <h2></h2>

        <section className="flex items-center flex-col w-full justify-center">
          <div className="w-full flex items-center justify-center">
            <input
              type="text"
              className="p-3 text-lg border w-1/3 rounded my-12 bg-slate-800 text-white border-gray-800 hover:border-slate-300"
              placeholder="Enter Bitcoin Transaction Address"
              onChange={(e) => setTxHash(e.target.value)}
            />
            <button
              className="px-4 py-3.5 mx-4 bg-slate-900 text-white rounded border border-white hover:bg-slate-950 duration-300"
              onClick={getTxDetails}
            >
              Trace Now
            </button>
          </div>
          <section className="self-center">
            <Link to="/Visualize">
              <button className="p-3 text-white self-center bg-slate-900 hover:bg-slate-950 border-2 rounded-md">
                Visualize
              </button>
            </Link>
          </section>
        </section>

        {txDetails && (
          <section className="p-4 text-white flex flex-col w-screen">
            <h2 className="text-3xl p-4 mb-4 text-center">
              Transaction Details
            </h2>
            <div className="m-2 justify-center items-center flex flex-col">
              <h3 className="text-3xl p-2 text-sky-500 flex flex-row items-center gap-3">
                Senders Wallet Address / Inputs:{" "}
                <HugeiconsMoneySendCircle className="text-4xl" />
              </h3>

              <ul>
                {txDetails.inputs.map((input, index) => (
                  <li key={index} className="leading-loose text-lg p-2">
                    {input.prev_out.addr}
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className='mb-2'>
                <strong>Total Bitcoin Transferred:</strong> {getTotalBitcoinTransferred (txDetails)} 
              </div> */}
            <div
              className="m-2 flex flex-col justify-center
               items-center"
            >
              <h3 className="text-3xl p-2 text-sky-500 flex flex-row gap-3 items-center">
                {" "}
                Recievers Wallet Address / Outputs:{" "}
                <HugeiconsMoneyReceiveCircle className="text-4xl" />
              </h3>
              <ul>
                {txDetails.out.map((output, index) => (
                  <li
                    key={index}
                    className="leading-loose text-lg p-2 text-center"
                  >
                    {output.addr}
                    {/* Value: {output.value} satoshis */}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <LogosBitcoin className="text-6xl text-sky-400 m-4" />
            </div>{" "}
            <Card
              Label={"Total Bitcoin Transferred"}
              Value={getTotalBitcoinTransferred(txDetails)}
            />
            <div className="flex justify-center items-center">
              <IonTime className="text-6xl text-slate-400 m-4" />
            </div>
            <Card
              Label={"Time Confirmed (UTC)"}
              Value={new Date(txDetails.time * 1000).toLocaleString()}
            />
          </section>
        )}
      </main>
    </>
  );
};

export default Home;
