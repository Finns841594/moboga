import * as go from 'gojs';
import { useEffect, useState } from 'react';
import { Label, StoryObj } from '../types';

interface IBubbleDiagramProp {
	beginningStoryId: string;
	beginningStoryName: string;
	beginningStoryLabels: Label[];
}

export const BubblesDiagram = ({
	beginningStoryId,
	beginningStoryName,
	beginningStoryLabels,
}: IBubbleDiagramProp) => {
	// ----------------------------   fengs area  ----------------------------

	useEffect(() => {
		initDiagram();
	}, []);

	console.log('👀 beginningStoryLabels', beginningStoryLabels);
	// ----------------------------   fengs area end ----------------------------

	// ----------------------------   bubble diagram area  ----------------------------
	const $ = go.GraphObject.make;

	const blues = [
		'#E1F5FE',
		'#B3E5FC',
		'#81D4FA',
		'#4FC3F7',
		'#29B6F6',
		'#03A9F4',
		'#039BE5',
		'#0288D1',
		'#0277BD',
		'#01579B',
	];

	let bubbleDiagram: any;

	const initDiagram = () => {
		bubbleDiagram = $(go.Diagram, 'bubbleDiagram', {
			initialContentAlignment: go.Spot.Center,
			layout: $(go.ForceDirectedLayout),
			// background: "#f5f5f5",
			'commandHandler.copiesTree': true,
			'commandHandler.deletesTree': true,
			'draggingTool.dragsTree': true,
			'undoManager.isEnabled': true,
		});

		bubbleDiagram.nodeTemplate = $(
			go.Node,
			'Spot',
			{
				selectionObjectName: 'PANEL',
				isTreeExpanded: false,
				isTreeLeaf: false,
			},
			$(
				go.Panel,
				'Auto',
				{ name: 'PANEL' },
				$(
					go.Shape,
					'Circle',
					{ fill: 'whitesmoke', stroke: 'green' },
					new go.Binding('fill', 'rootdistance', dist => {
						dist = Math.min(blues.length - 1, dist);
						return blues[dist];
					})
				),
				$(
					go.TextBlock,
					{
						font: '12pt sans-serif',
						margin: 5,
						click: (e: any, obj: any) => window.open('./details/games/2'),
					},
					new go.Binding('text', 'key')
				)
			),
			$('TreeExpanderButton', {
				name: 'TREEBUTTON',
				width: 14,
				height: 14,
				alignment: go.Spot.TopRight,
				alignmentFocus: go.Spot.Center,
				click: (e, obj) => {
					// OBJ is the Button
					var node = obj.part; // get the Node containing this Button
					if (node === null) return;
					e.handled = true;
					expandNode(node);
				},
			})
		);

		const nodeContent = beginningStoryName || 'Fail to fethc initial data';
		bubbleDiagram.model = new go.TreeModel([
			{ key: nodeContent, color: blues[0], everExpanded: false },
		]);

		// document.getElementById('zoomToFit').addEventListener('click', () => myDiagram.zoomToFit());

		// document.getElementById('expandAtRandom').addEventListener('click', () => expandAtRandom());
	};

	const expandNode = (node: any) => {
		var diagram = node.diagram;
		diagram.startTransaction('CollapseExpandTree');
		// this behavior is specific to this incrementalTree sample:
		var data = node.data;
		if (!data.everExpanded) {
			// only create children once per node
			diagram.model.setDataProperty(data, 'everExpanded', true);
			var numchildren = createSubTree(data);
			if (numchildren === 0) {
				// now known no children: don't need Button!
				node.findObject('TREEBUTTON').visible = false;
			}
		}
		// this behavior is generic for most expand/collapse tree buttons:
		if (node.isTreeExpanded) {
			diagram.commandHandler.collapseTree(node);
		} else {
			diagram.commandHandler.expandTree(node);
		}
		diagram.commitTransaction('CollapseExpandTree');
		bubbleDiagram.zoomToFit();
	};

	const createSubTree = (parentdata: any) => {
		// var numchildren = Math.floor(Math.random() * 10);
		var numchildren = 3;
		// if (bubbleDiagram.nodes.count <= 1) {
		// 	numchildren += 1; // make sure the root node has at least one child
		// }
		// create several node data objects and add them to the model
		var model = bubbleDiagram.model;
		var parent = bubbleDiagram.findNodeForData(parentdata);

		var degrees = 1;
		var grandparent = parent.findTreeParentNode();
		while (grandparent) {
			degrees++;
			grandparent = grandparent.findTreeParentNode();
		}

		let childData = beginningStoryLabels;
		for (var i = 0; i < numchildren; i++) {
			var childdata = {
				key: childData[i].name || 'Fail to fetch data',
				parent: parentdata.key,
				rootdistance: degrees,
			};
			// add to model.nodeDataArray and create a Node
			model.addNodeData(childdata);
			// position the new child node close to the parent
			var child = bubbleDiagram.findNodeForData(childdata);
			child.location = parent.location;
		}
		return numchildren;
	};

	const expandAtRandom = () => {
		var eligibleNodes: any[] = [];
		bubbleDiagram.nodes.each((n: any) => {
			if (!n.isTreeExpanded) eligibleNodes.push(n);
		});
		var node = eligibleNodes[Math.floor(Math.random() * eligibleNodes.length)];
		expandNode(node);
	};

	return (
		<>
			<div id="sample">
				<div id="bubbleDiagram">
					<canvas className="canvas">
						This text is displayed if your browser does not support the Canvas
						HTML element.
					</canvas>
				</div>
			</div>
		</>
	);
};
