<template>
  <div class="workflow-render-box">
    <YXTBpmnViewer
      ref="YXTWorkFlowViewerRef"
      :action="handelWorkflow"
    >
      <CustomPropertyPanel
        slot="customPanel"
        ref="customPanel"
        class="properties-panel__custom"
        view="edit"
        :bpmnModeler="bpmnModeler"
        :workFlowObj="workFlowObj"
        :operator="operator"
        :action="handlerPanel"
      />
    </YXTBpmnViewer>
  </div>
</template>
<script>
import { CustomPropertyPanel } from 'yxt-workflow-engine'
import diagramXML from './NewDiagram.bpmn'
import { UserModule } from '@/store/modules/user'

export default {
  name: 'workflowRenderComp',
  components: {
    CustomPropertyPanel
  },
  data() {
    return {
      requestObj: {
        url: 'http://121.36.17.224:31071/api',
        token: UserModule.token
      },
      panelData: {
        preId: '0335174a8f63197cd4331386ae16a87d',
        categories: '3.01',
        tenantId: '',
        deploymentId: ''
      },
      bpmnModeler: null,
      workFlowObj: { id: '11', name: 'name', targetNamespace: 'targetNamespace' }
    }
  },
  mounted() {
    this.$refs.YXTWorkFlowViewerRef.initWorkFlowObj(diagramXML)
  },
  methods: {
    handelWorkflow(key, data) {
      if (key == 'customPanel') {
        let { elementType, elementId, isShow, bpmnModeler } = data
        this.bpmnModeler = bpmnModeler
        this.$refs.customPanel.initPanelObject(elementType, elementId, isShow)
      }
    },
    handlerPanel() {

    }
  }
}
</script>
<style lang="scss" scoped>
.workFlow-design-content {
  background: #ccc;
}
.workflow-render-box {
  height: 100%;
  width: 100%;
}
</style>
