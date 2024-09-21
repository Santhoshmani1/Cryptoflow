import { useEffect } from 'react';
import cytoscape from 'cytoscape';

import './TxGraph.css'; // Create a CSS file for styles

const TxGraph = () => {
    useEffect(() => {
        const walletTypes = {
            NORMAL: { color: 'blue', label: 'Normal Wallet' },
            EMPTY: { color: 'gray', label: 'Empty Transaction Wallet' },
            SUSPICIOUS: { color: 'red', label: 'Suspicious Wallet' },
            EXCHANGE: { color: 'green', label: 'Exchange Wallet' }
        };

        function generateRandomHash() {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }

        function createWallet(type, transactionCount) {
            return {
                data: {
                    id: generateRandomHash(),
                    label: walletTypes[type].label,
                    type: type,
                    color: walletTypes[type].color,
                    transactionCount: transactionCount
                }
            };
        }

        function createTransaction(source, target) {
            return {
                data: {
                    id: `${source}-${target}`,
                    source: source,
                    target: target,
                    label: 'Transaction'
                }
            };
        }

        function generateGraph(nodeCount = 20) {
            const nodes = [];
            const edges = [];

            for (let i = 0; i < nodeCount; i++) {
                const type = Object.keys(walletTypes)[Math.floor(Math.random() * Object.keys(walletTypes).length)];
                const transactionCount = type === 'EMPTY' ? 1 :
                    type === 'EXCHANGE' ? Math.floor(Math.random() * 1000) + 500 :
                        type === 'SUSPICIOUS' ? Math.floor(Math.random() * 200) + 50 :
                            Math.floor(Math.random() * 100) + 10;
                nodes.push(createWallet(type, transactionCount));
            }

            // Create a more connected graph
            for (let i = 0; i < nodeCount; i++) {
                const connections = Math.floor(Math.random() * 3) + 1; // 1 to 3 connections per node
                for (let j = 0; j < connections; j++) {
                    const target = Math.floor(Math.random() * nodeCount);
                    if (i !== target) {
                        edges.push(createTransaction(nodes[i].data.id, nodes[target].data.id));
                    }
                }
            }

            return { nodes, edges };
        }

        const initialGraph = generateGraph(30); // Start with 30 nodes

        const cy = cytoscape({
            container: document.getElementById('cy'),
            elements: [...initialGraph.nodes, ...initialGraph.edges],
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': 'data(color)',
                        'label': 'data(label)',
                        'color': '#fff',
                        'text-outline-color': '#000',
                        'text-outline-width': 2,
                        'font-size': 14,
                        'width': 50,
                        'height': 50
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier',
                        'label': 'data(label)',
                        'font-size': 10,
                        'text-rotation': 'autorotate',
                        'text-margin-y': -10
                    }
                }
            ],
            layout: {
                name: 'cose',
                randomize: true,
                animate: false,
                fit: true,
                padding: 50
            }
        });

        cy.on('tap', 'node', function (evt) {
            const clickedNode = evt.target;
            const newSubgraph = generateGraph(10);  // Generate a subgraph with 10 nodes

            // Connect the first node of the new subgraph to the clicked node
            const connectingEdge = createTransaction(clickedNode.id(), newSubgraph.nodes[0].data.id);

            // Add new elements to the graph
            cy.add([...newSubgraph.nodes, ...newSubgraph.edges, connectingEdge]);

            // Position new nodes around the clicked node
            const centerX = clickedNode.position('x');
            const centerY = clickedNode.position('y');
            const radius = 200;
            newSubgraph.nodes.forEach((node, index) => {
                const angle = (2 * Math.PI * index) / newSubgraph.nodes.length;
                const x = centerX + radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                cy.getElementById(node.data.id).position({ x, y });
            });

            // Run a layout only on the new nodes
            const subCy = cy.collection().union(newSubgraph.nodes.map(n => cy.getElementById(n.data.id)))
                .union(newSubgraph.edges.map(e => cy.getElementById(e.data.id)))
                .union(cy.getElementById(connectingEdge.data.id));

            const layout = subCy.layout({
                name: 'cose',
                randomize: false,
                animate: true,
                animationDuration: 1000,
                fit: false
            });

            layout.run();
        });

        const tooltip = document.getElementById('tooltip');

        cy.on('mouseover', 'node', function (evt) {
            const node = evt.target;
            const { id, type, transactionCount } = node.data();
            tooltip.innerHTML = `
        <strong>Wallet Address:</strong> ${id}<br>
        <strong>Type:</strong> ${type}<br>
        <strong>Transaction Count:</strong> ${transactionCount}
      `;
            tooltip.style.display = 'block';
            tooltip.style.left = evt.renderedPosition.x + 'px';
            tooltip.style.top = evt.renderedPosition.y + 'px';
        });

        cy.on('mouseout', 'node', function () {
            tooltip.style.display = 'none';
        });

        cy.on('mousemove', function (evt) {
            if (tooltip.style.display === 'block') {
                tooltip.style.left = evt.renderedPosition.x + 10 + 'px';
                tooltip.style.top = evt.renderedPosition.y + 10 + 'px';
            }
        });

        // Add 3D effect
        cy.nodes().forEach(function (ele) {
            ele.style('height', 50);
            ele.style('width', 50);
            ele.style('shape', 'ellipse');
            ele.style('background-opacity', 0.8);
            ele.style('border-width', 3);
            ele.style('border-color', '#000');
            ele.style('box-shadow', '0 0 10px rgba(0,0,0,0.5)');
        });

        // Make the graph more dynamic
        setInterval(() => {
            cy.nodes().forEach(node => {
                node.animate({
                    position: {
                        x: node.position('x') + (Math.random() - 0.5) * 5,
                        y: node.position('y') + (Math.random() - 0.5) * 5
                    }
                }, {
                    duration: 1000
                });
            });
        }, 2000);
    }, []);

    return (
        <div>
            <div id="cy" style={{ width: '100%', height: '100vh', position: 'relative' }}></div>
            <div id="tooltip" style={{ position: 'absolute', zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white', padding: '10px', borderRadius: '5px', display: 'none' }}></div>
        </div>
    );
};

export default TxGraph;