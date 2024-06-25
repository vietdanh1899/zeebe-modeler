import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import './App.css'
import diagramJsCss from 'bpmn-js/dist/assets/diagram-js.css?inline';
import bpmnJsCss from 'bpmn-js/dist/assets/bpmn-js.css?inline';

import bpmnEmbeddedCss from 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css?inline';
import propertiesPanelCss from '@bpmn-io/properties-panel/assets/properties-panel.css?inline';

import {
  BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, ZeebePropertiesProviderModule
} from 'bpmn-js-properties-panel';
import BpmnModeler from 'bpmn-js/lib/Modeler';
// Camunda 8 moddle extension
import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';

// Camunda 8 behaviors
import ZeebeBehaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';
import gridModule from 'diagram-js-grid';

import diagramXML from './resources/newDiagram.bpmn?raw';
import styled from "styled-components";
import {useResizable} from "react-resizable-layout";
import SampleSplitter from "./SampleSplitter.tsx";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    ${diagramJsCss}
    ${bpmnJsCss}
    ${bpmnEmbeddedCss}
    ${propertiesPanelCss}
`

const ModelerContainer = styled.div`
    width: 100%;
    height: 100%;

    .bjs-powered-by {
        display: none;
    }
`

const PropertiesPanelContainer = styled.div<{ $isDragging: boolean }>`
    background-color: white;
    flex-shrink: 0;

    .bio-properties-panel-container {
        width: 100%;
    }

    ${props => props.$isDragging && `
        filter: blur(5px);`}
`

export interface ChildProps {
  xml?: string;
}

export interface ChildRef {
  xml: () => Promise<string | undefined>;
}

const App = forwardRef<ChildRef, ChildProps>(({xml}, ref) => {
  const containerRef = useRef(null);
  const bpmnModeler = useRef<BpmnModeler>();
  const propertiesPanelRef = useRef(null);

  const {
    isDragging: isPropertiesPanelDragging, position: propertiesPanelWidth, separatorProps: dragBarProps
  } = useResizable({
    axis: "x", initial: 200, min: 50, reverse: true
  });

  useImperativeHandle(ref, () => ({
    xml: async () => {
      const {xml} = await bpmnModeler.current?.saveXML({format: true}) || {};
      return xml;
    }
  }), []);

  useEffect(() => {
    console.log('mounted')
    const container = containerRef.current;

    bpmnModeler.current = new BpmnModeler({
      container: container ?? undefined,
      additionalModules: [BpmnPropertiesPanelModule, BpmnPropertiesProviderModule, ZeebePropertiesProviderModule, ZeebeBehaviorsModule, gridModule],
      moddleExtensions: {
        zeebe: zeebeModdle
      }
    });

    const propertiesPanel: any = bpmnModeler.current.get('propertiesPanel');
    propertiesPanel.attachTo(propertiesPanelRef.current!);

    bpmnModeler.current?.importXML(xml ?? diagramXML);

    return () => {
      console.log('unmounted')
      bpmnModeler.current!.destroy();
    }
  }, [])

  return (<Wrapper>
    <ModelerContainer ref={containerRef}/>

    <SampleSplitter
      isDragging={isPropertiesPanelDragging}
      {...dragBarProps}
    />

    <PropertiesPanelContainer $isDragging={isPropertiesPanelDragging} ref={propertiesPanelRef}
                              style={{width: propertiesPanelWidth}}></PropertiesPanelContainer>
  </Wrapper>)
});

export default App
