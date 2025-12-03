<script setup>
const tasks = [
  {request_id:'CR-001', request_type:'Create VM', cloud_provider:'AWS', service_region:'us-east-1', resource_details:'t3.medium, Ubuntu 22.04', priority:'High', estimated_cost:'$45/month', launch_date:'2026-01-15', requester:'J. Doe', status:'Pending Approval'},
  {request_id:'CR-002', request_type:'Expand Database Storage', cloud_provider:'Azure', service_region:'East US 2', resource_details:'Azure SQL, add 500GB', priority:'High', estimated_cost:'$70/month', launch_date:'2025-12-10', requester:'A. Smith', status:'In Progress'},
  {request_id:'CR-003', request_type:'Deploy Serverless Function', cloud_provider:'AWS', service_region:'ap-southeast-2', resource_details:'Lambda function, Python 3.9', priority:'Medium', estimated_cost:'$5/month', launch_date:'2026-02-01', requester:'M. Chan', status:'New'},
  {request_id:'CR-004', request_type:'Network Firewall Rule Change', cloud_provider:'Azure', service_region:'West Europe', resource_details:'Allow port 8080 to subnet X', priority:'High', estimated_cost:'$0', launch_date:'2025-12-05', requester:'R. Garcia', status:'Scheduled'},
  {request_id:'CR-005', request_type:'Create S3 Bucket', cloud_provider:'AWS', service_region:'eu-central-1', resource_details:'Private, Lifecycle Policy: 90 days', priority:'Low', estimated_cost:'$10/month', launch_date:'2026-01-28', requester:'S. Kim', status:'New'},
  {request_id:'CR-006', request_type:'Migrate Web App Container', cloud_provider:'Azure', service_region:'Central US', resource_details:'Azure Kubernetes Service (AKS)', priority:'Medium', estimated_cost:'$120/month', launch_date:'2026-02-15', requester:'T. Miller', status:'Pending Approval'},
  {request_id:'CR-007', request_type:'Request Static IP', cloud_provider:'AWS', service_region:'us-west-2', resource_details:'Associate with Load Balancer', priority:'High', estimated_cost:'$3/month', launch_date:'2025-12-08', requester:'B. Jones', status:'In Progress'},
  {request_id:'CR-008', request_type:'Delete Unused Resource Group', cloud_provider:'Azure', service_region:'South UK', resource_details:'RG-Test-Environment-Old', priority:'Low', estimated_cost:'$0', launch_date:'2026-03-01', requester:'E. Chen', status:'New'},
  {request_id:'CR-009', request_type:'Configure Identity Access (IAM)', cloud_provider:'AWS', service_region:'global', resource_details:'Create new admin group policy', priority:'Medium', estimated_cost:'$0', launch_date:'2025-12-20', requester:'P. Wirtz', status:'Scheduled'},
  {request_id:'CR-010', request_type:'Setup Monitoring Alert', cloud_provider:'Azure', service_region:'East Asia', resource_details:'CPU usage > 80% on VM-Prod-App', priority:'Medium', estimated_cost:'$1/month', launch_date:'2026-01-01', requester:'L. Hall', status:'Pending Approval'}
];
</script>

<template>
  <div class="tasks-container">
    <h2>Running Tasks</h2>
    <ul class="task-list">
      <li 
        v-for="(task, index) in tasks" 
        :key="task.id"
        class="task-item"
      >
        <!-- Displaying the index (starting from 1) and the text property of the item -->
        <span class="task-index">{{ index + 1 }}.</span>
        <span class="task-text">{{ task.request_id }}</span>
        <span class="task-text">{{ task.request_type }}</span>
        <span class="task-text">{{ task.cloud_provider }}</span>
        <span class="task-text">{{ task.service_region }}</span>
        <span class="task-text">{{ task.resource_details }}</span>
        <span class="task-text">{{ task.priority }}</span>
        <span class="task-text">{{ task.estimated_cost }}</span>
        <span class="task-text">{{ task.launch_date }}</span>
        <span class="task-text">{{ task.requester }}</span>
        <span class="task-text">{{ task.status }}</span>
        <span 
          :class="task.priority === 'High' ? 'task-priority priority-high' : task.priority === 'Low' ? 'task-priority priority-low' : 'task-priority priority-medium'"
        >
          {{ task.priority }}
        </span>
      </li>
    </ul>
  </div>        
</template>

<style lang="scss" scoped>
.tasks-container {
    height: 100%;
}
  
.task-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.task-item {
    display: flex;
    align-items: center;
    padding: 1px 12px;
    background-color: #f0f0f0;
    transition: background-color 0.15s ease;
    margin-top: 2px;
}

.task-item:first-child {
  margin-top: 10px;
}

.task-item:hover {
  background-color: #e0e7ff;
}
.task-index {
    font-weight: 600;
    color: #1d0bea;
    width: 32px;
    flex-shrink: 0;
}

.task-text {
    color: #0e4fb8;
    flex-grow: 1;
}
.task-priority {
    margin-left: 1rem; /* ml-4 */
    padding: 2px 12px; /* px-2 py-0.5 */
    font-size: 0.75rem; /* text-xs */
    font-weight: 500;
    color: white;
    border-radius: 9999px; /* rounded-full */
    flex-shrink: 0;
}
.priority-high {
    background-color: #ef4444; /* bg-red-500 */
}
.priority-low {
    background-color: #22c55e; /* bg-green-500 */
}
.priority-medium {
    background-color: #f97316; /* bg-orange-500 equivalent */
}
</style>