import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph from "graphology";
import {
  SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

const SampleTransactions = [
  {
    identity: 0,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x23edc7ff9724dfde",
      balance: 80.27,
      total_transactions: 865,
      id: 1,
      type: "P",
    },
    elementId: "4:d8d5a3ac-720e-4a6d-a1a3-94f9dcd55e44:0",
  },
  {
    identity: 1,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x18eac8b99273feac",
      balance: 200.13,
      total_transactions: 354,
      id: 2,
      type: "B",
    },
    elementId: "2:a5d3a7bc-213f-4b7b-b2f1-12a7cd855b23:0",
  },
  {
    identity: 2,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x42aece9234adc7ef",
      balance: 110.99,
      total_transactions: 750,
      id: 3,
      type: "E",
    },
    elementId: "3:c2b7d9a1-5d3e-42be-9391-fd08c7eb3f55:0",
  },
  {
    identity: 3,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x9daec81234afdeb1",
      balance: 500.13,
      total_transactions: 654,
      id: 4,
      type: "S",
    },
    elementId: "1:93ebc9ad-4ea3-4b93-bddf-a1832c9279b9:0",
  },
  {
    identity: 4,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x12fecd71234bfed1",
      balance: 1000.98,
      total_transactions: 1054,
      id: 5,
      type: "C",
    },
    elementId: "6:bdef8b23-3d1e-453f-bd84-f8d8c8cd62a8:0",
  },
  {
    identity: 5,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x56fdc7ffb243aede",
      balance: 300.45,
      total_transactions: 487,
      id: 6,
      type: "I",
    },
    elementId: "7:cfaeb9a7-5bde-4a67-a1a4-b92fd839d9a5:0",
  },
  {
    identity: 6,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x98efc8a1234d5fbc",
      balance: 450.78,
      total_transactions: 1203,
      id: 7,
      type: "M",
    },
    elementId: "8:9faec3d5-6bd1-4b2d-9a5d-adaedb12f93e:0",
  },
  {
    identity: 7,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x12fdc7ac9343fbc1",
      balance: 950.6,
      total_transactions: 999,
      id: 8,
      type: "H",
    },
    elementId: "9:b2d7e6fa-3a65-4f7d-a3c4-b7dfac51edb8:0",
  },
  {
    identity: 8,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x32ecda76134dfcce",
      balance: 710.12,
      total_transactions: 1345,
      id: 9,
      type: "D",
    },
    elementId: "10:5fdfc7bc-65d3-43d7-bf1e-dbf2ad71f5db:0",
  },
  {
    identity: 9,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x43abc89234d5afde",
      balance: 780.45,
      total_transactions: 1420,
      id: 10,
      type: "R",
    },
    elementId: "11:8eabf6ac-4c7e-463f-9c6f-d5af7c13b9f7:0",
  },
  {
    identity: 10,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x67aed8234afdeac1",
      balance: 250.37,
      total_transactions: 783,
      id: 11,
      type: "C",
    },
    elementId: "12:ba3c9e67-34b3-4768-bf4a-ea94d5cdbef9:0",
  },
  {
    identity: 11,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x89d8c9bc134dfab2",
      balance: 345.56,
      total_transactions: 654,
      id: 12,
      type: "W",
    },
    elementId: "13:fbc8e3a2-2437-4c5a-bd7e-ac3f9e7d6a4b:0",
  },
  {
    identity: 12,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x12fbd7bc934dfbce",
      balance: 620.89,
      total_transactions: 987,
      id: 13,
      type: "D",
    },
    elementId: "14:4df6c7ab-67b8-4c2b-b7a5-fc6a8d93c8f1:0",
  },
  {
    identity: 13,
    labels: ["PersonalWallet", "Wallet"],
    properties: {
      wallet_address: "0x45ace3bc134f5fbc",
      balance: 430.34,
      total_transactions: 643,
      id: 14,
      type: "G",
    },
    elementId: "15:9db7c4a3-5b1c-4d2d-9b7a-f7c6a8bc5d4e:0",
  },
  {
    identity: 14,
    labels: ["ExchangeWallet", "Wallet"],
    properties: {
      wallet_address: "0x67fdc9ae432f5dbc",
      balance: 850.23,
      total_transactions: 1234,
      id: 15,
      type: "E",
    },
    elementId: "16:7bf8c6d4-9f5e-4a7a-8c3d-b9d5c7a8d8fb:0",
  },
];

function generateRandomColor() {
  let color = "#";
  for (let i = 0; color.length <= 7; i++) {
    color += Math.floor(Math.random() * 91).toString();
  }
  return color;
}

const GraphEvents = ({ transactionData }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showText, setShowText] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const registerEvents = useRegisterEvents();

  useEffect(() => {
    registerEvents({
      enterNode: (event) => {
        const node = event.node;
        const transaction = transactionData.find(
          (tx) => tx.properties.wallet_address === node
        );

        const clientX = event.event.original.clientX;
        const clientY = event.event.original.clientY;

        setShowText(true);
        setMousePosition({ x: clientX, y: clientY });
        setCurrentTransaction(transaction);
      },
      leaveNode: () => {
        setShowText(false);
        setCurrentTransaction(null);
      },
    });
  }, [registerEvents, transactionData]);

  return (
    <>
      {showText && currentTransaction && (
        <div
          style={{
            position: "absolute",
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            backgroundColor: "black",
            color: "white",
            transform: "translate(-15%, -100%)",
            padding: "10px",
            borderRadius: "8px",
            pointerEvents: "none",
          }}
        >
          <div>
            <strong>Wallet Address:</strong>{" "}
            {currentTransaction.properties.wallet_address}
          </div>
          <div>
            <strong>Balance:</strong> {currentTransaction.properties.balance}
          </div>
          <div>
            <strong>Total Transactions:</strong>{" "}
            {currentTransaction.properties.total_transactions}
          </div>
          <div>
            <strong>Type:</strong> {currentTransaction.properties.type}
          </div>
        </div>
      )}
    </>
  );
};

const sigmaStyle = {
  height: "600px",
  borderRadius: "12px",
  backgroundColor: "#f1f5f9",
};

export const LoadGraph = ({ transactionData }) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();
    const canvasWidth = 800;
    const canvasHeight = 600;
    const senderAddress = transactionData[0].properties.wallet_address;
    const exchangeAddress =
      transactionData[transactionData.length - 1].properties.wallet_address;

    graph.addNode(exchangeAddress, {
      x: canvasWidth / 2,
      y: 50,
      label: "Exchange Wallet",
      color: "#FF0000",
      size: 55,
    });

    graph.addNode(senderAddress, {
      x: canvasWidth / 2,
      y: canvasHeight - 50,
      label: "Sender Wallet",
      color: "#00FF00",
      size: 55,
    });

    transactionData.slice(1).forEach((tx) => {
      const walletAddress = tx.properties.wallet_address;
      if (walletAddress === exchangeAddress) {
        return;
      }
      graph.addNode(walletAddress, {
        x: Math.random() * canvasWidth,
        y: Math.random() * (canvasHeight - 200) + 100,
        label: walletAddress,
        color: generateRandomColor(),
        size: 40,
      });

      graph.addEdgeWithKey(
        `sender-to-${walletAddress}`,
        senderAddress,
        walletAddress,
        {
          label: `Transaction to ${walletAddress}`,
          color: "#ccc",
          size: 2,
        }
      );

      graph.addEdgeWithKey(
        `wallet-to-exchange-${walletAddress}`,
        walletAddress,
        exchangeAddress,
        {
          label: `Redirected to Exchange`,
          color: "#ccc",
          size: 2,
        }
      );
    });

    loadGraph(graph);
  }, [loadGraph, transactionData]);

  return null;
};

export const SimpleGraph = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate(-1);
  };

  return (
    <section className="min-h-screen p-12 flex flex-col gap-4 bg-gray-950">
      <section>
        <h2 className="text-lg text-center text-white font-semibold">
          Graph Visualization of transactions flow
        </h2>
      </section>
      <section className="rounded-lg relative">
        <SigmaContainer style={sigmaStyle}>
          <LoadGraph transactionData={SampleTransactions} />
          <GraphEvents transactionData={SampleTransactions} />
        </SigmaContainer>
      </section>
      <button
        className="bg-green-600 text-slate-200 self-center p-2 rounded-lg hover:bg-green-500"
        onClick={() => navigateToHome()}
      >
        Go Back
      </button>
    </section>
  );
};

export default SimpleGraph;
