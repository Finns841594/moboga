import * as go from 'gojs';
import { useEffect, useState } from 'react';
import { Label, StoryObj } from '../types';

interface IBubbleDiagramProp {
	beginningStoryId: string;
	beginningStoryName: string;
	beginningStoryLabels: Label[];
	allStories: StoryObj[];
	labels: Label[];
}

export const BubblesDiagram = ({
	beginningStoryId,
	beginningStoryName,
	beginningStoryLabels,
	allStories,
	labels,
}: IBubbleDiagramProp) => {
	// ----------------------------   fengs area  ----------------------------

	useEffect(() => {
		initDiagram();
	}, []);

	// console.log('👀 beginningStoryLabels', beginningStoryLabels);
	// ----------------------------   fengs area end ----------------------------
	function createButton(name:any, spot:any, testSpot:any) {
		console.log('👀👀👀👀 testSpot', testSpot);
		return $(
		go.Panel,
		'Spot',
		{ alignment: spot, alignmentFocus: go.Spot.Center,},
		$( go.Shape, 'Circle',
		{
		fill: 'transparent',
		stroke: '#eaeaea',
		strokeWidth: 1,
		// width: 80,
		// height: 30,
		},
		new go.Binding('fill', 'buttonFill')
		),
		$(
		go.TextBlock,
		name,
		{
		font: '12px sans-serif',
		margin: 0,
		},
		new go.Binding('text', 'buttonText')
		),
		{
		click: (e, obj) => {
		e.diagram.startTransaction('button click');
		console.log(`${name} clicked!`);
		// Add your custom logic for the button click here
		e.diagram.commitTransaction('button click');
		},
		}
		);
		}
	// ----------------------------   bubble diagram area  ----------------------------
	const $ = go.GraphObject.make;

	const blues = [
		'#646CFF',
		'#8464FF',
		'#A364FF',
		'#C864FF',
		'#F264FF',
		'#FF64C1',
		'#FF6495',
	];

	let bubbleDiagram: any;
	let createdItems: any = [];

	const initDiagram = () => {

		createdItems = [beginningStoryId];
		const glowEffect = $(go.Adornment, 'spot',
			$(go.Shape, 'Circle', { fill: 'transparent', stroke: 'white', strokeWidth: 10}),
			$(go.Placeholder)
		);
		
		bubbleDiagram = $(go.Diagram, 'bubbleDiagram', {
			initialContentAlignment: go.Spot.Center,
			layout: $(go.ForceDirectedLayout),
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
					{ fill: 'transparent', stroke: '#eaeaea', strokeWidth: 3},
					// new go.Binding('fill', 'rootdistance', dist => {
					// 	dist = Math.min(blues.length - 1, dist);
					// 	return 'transparent';
					// }),
					// {
					// 	mouseEnter: (e:any, obj:any) => { obj.strokeWidth = 10; obj.stroke = "#FF6495"; },
					// 	mouseLeave: (e:any, obj:any) => { obj.strokeWidth = 3; obj.stroke = "#eaeaea"; },
					// 	click: (e:any, node:any) => {
					// 		node.stroke = "#eaeaea";
					// 	}
					// },
					new go.Binding("stroke", "rootdistance", dist => {
						dist = Math.min(blues.length - 1, dist);
						return blues[dist]
					}),
				),
				$(
					go.TextBlock,
					{
						font: 'bold 12pt sans-serif',
						stroke: 'white',
						margin: 3,
						click: (e: any, obj: any) => {
							// console.log('👀👀👀👀 story name', obj.bc);

							let storyId 
							const story = allStories.find(story => story.storyname === obj.bc)
							if (story) { 
								storyId = story.id;
								console.log('👀👀👀👀 story id', storyId);
								window.open(`/details/movies/${storyId}`)
								}
							},

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
			}),
			// createButton('Movies', go.Spot.TopCenter, go),
			// createButton('Books', go.Spot.BottomLeft, go),
			// createButton('Games', go.Spot.BottomRight, go),
			
		);

		bubbleDiagram.linkTemplate = $(
			go.Link,
			{ curve: go.Link.Bezier },
			$(go.Shape, { stroke: '#eaeaea', strokeWidth: 2 }),
			$(
				go.Shape,
				{ toArrow: 'OpenTriangle' },
				{ stroke: '#eaeaea', strokeWidth: 2 }
			)
		);

		const nodeContent = beginningStoryName || 'Fail to fethc initial data';
		bubbleDiagram.model = new go.TreeModel([
			{ key: nodeContent, color: '#eaeaea', strokeWidth: 5, everExpanded: false, id: beginningStoryId},
		]);
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
		// create several node data objects and add them to the model
		var model = bubbleDiagram.model;
		var parent = bubbleDiagram.findNodeForData(parentdata);

		var degrees = 1;
		var grandparent = parent.findTreeParentNode();
		while (grandparent) {
			degrees++;
			grandparent = grandparent.findTreeParentNode();
		}

		let childData: any = [];
		// check if current parentdata.key is a story or a lable
		// if it is a story, then fetch the labels
		const labelCheckingResult = labels.filter(
			(label: any) => label.name === parentdata.key
		);
		if (labelCheckingResult && labelCheckingResult.length > 0) {
			// get stories by the label
			childData = allStories.filter((story: any) => story.labels.some((label: any) => label.name === parentdata.key))
		} else {
			// get labels by the story
			const theStory = allStories.find((story: any) => story.storyname === parentdata.key)
			if (theStory) {
				theStory.labels.forEach((label: any) => {
				childData.push(label)
			})

			}
		}

		for (var i = 0; i < childData.length; i++) {
			if (createdItems.includes(childData[i].id)) {
				// do nothing
			} else {
				var childdata = {
				key:
					childData[i].name || childData[i].storyname || 'Fail to fetch data',
				parent: parentdata.key,
				rootdistance: degrees,
				id: childData[i].id,
			};
			// add to model.nodeDataArray and create a Node
			model.addNodeData(childdata);
			// position the new child node close to the parent
			var child = bubbleDiagram.findNodeForData(childdata);
			child.location = parent.location;}
			createdItems.push(childData[i].id)
		}
		// to be finished: return correct number of children
		// console.log('🤪 childData length:', childData.length)
		return childData.length;
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
