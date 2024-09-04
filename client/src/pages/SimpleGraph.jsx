import { lazy, useEffect, useState } from "react";
import Graph from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { LogosBitcoin } from "../assets/icons";

const sigmaStyle = { height: "500px", width: "500px" };
export const LoadGraph = ({ transactionData }) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();
    let prevNode;
    transactionData.out.map((walletAddr, index) => {
      graph.addNode(walletAddr.addr, {
        x: index * 20,
        y: 30,
        label: walletAddr.addr,
        color: "cyan",
        size: 35,
      });
      if (prevNode !== undefined) {
        graph.addDirectedEdgeWithKey("edge", prevNode, walletAddr.addr, {
          label: "edge",
        });
      }
      prevNode = walletAddr.addr;
    });

    loadGraph(graph);
  }, [loadGraph, transactionData]);

  return null;
};

// Component that display the graph
export const SimpleGraph = ({ transactionData }) => {
  return (
    <SigmaContainer style={sigmaStyle}>
      <LoadGraph transactionData={transactionData} />
    </SigmaContainer>
  );
};

export default SimpleGraph;
