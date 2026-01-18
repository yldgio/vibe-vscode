---
name: Azure Role Selector
description: Select and configure appropriate Azure RBAC roles following the principle of least privilege for secure access control
---

# Azure Role Selector

This skill helps you choose the right Azure RBAC (Role-Based Access Control) roles and implement least-privilege access patterns for applications and users.

## When to Use This Skill

Use this skill when you need to:
- Select appropriate Azure built-in roles for specific scenarios
- Create custom RBAC role definitions
- Implement least-privilege access for applications
- Configure role assignments at correct scopes
- Set up Managed Identity with proper permissions
- Audit and review existing role assignments

## Capabilities

- Recommend Azure built-in roles for common scenarios
- Guide custom role definition creation
- Analyze permission requirements
- Configure role assignments at appropriate scopes (subscription, resource group, resource)
- Implement Managed Identity authentication
- Provide security best practices for RBAC

## Prerequisites

- Azure subscription
- Understanding of Azure resource hierarchy
- Permissions to manage RBAC (User Access Administrator or Owner role)
- Knowledge of application requirements

## Common Built-in Roles

### General Roles

| Role | Use Case | Permissions |
|------|----------|-------------|
| **Owner** | Full control including access management | All actions + role assignments |
| **Contributor** | Manage resources but not access | All actions except role assignments |
| **Reader** | View-only access | Read all resources |

### Data Access Roles

#### Storage

- **Storage Blob Data Contributor**: Read/write/delete blobs
- **Storage Blob Data Reader**: Read-only blob access
- **Storage Queue Data Contributor**: Read/write/delete queue messages
- **Storage Table Data Contributor**: Read/write/delete table data

#### Databases

- **SQL DB Contributor**: Manage SQL databases (not data access)
- **Cosmos DB Account Reader Role**: Read Cosmos DB metadata
- **Redis Cache Contributor**: Manage Redis caches

### Security Roles

- **Key Vault Secrets User**: Read secret values (recommended)
- **Key Vault Secrets Officer**: Manage secrets lifecycle
- **Key Vault Crypto User**: Cryptographic operations
- **Security Reader**: View security recommendations

### Application Roles

- **Website Contributor**: Manage web apps
- **Web Plan Contributor**: Manage App Service plans
- **Logic App Contributor**: Manage Logic Apps
- **Function App Contributor**: Manage Function Apps

### Monitoring Roles

- **Monitoring Reader**: Read monitoring data
- **Monitoring Contributor**: Manage monitoring configuration
- **Log Analytics Reader**: Query logs
- **Application Insights Component Contributor**: Manage Application Insights

## Quick Start Guide

### Step 1: Identify Required Permissions

```bash
# List all operations for a service
az provider operation show --namespace Microsoft.Storage

# Search for specific permissions
az provider operation show --namespace Microsoft.KeyVault | grep "secrets/read"
```

### Step 2: Find Matching Built-in Role

```bash
# List all built-in roles
az role definition list --output table

# Search by name
az role definition list --name "*Storage Blob*" --output table

# Get detailed role permissions
az role definition list --name "Storage Blob Data Reader" --output json
```

### Step 3: Assign Role at Proper Scope

```bash
# Resource-level (most restrictive - RECOMMENDED)
az role assignment create \
  --assignee <principal-id> \
  --role "Storage Blob Data Reader" \
  --scope "/subscriptions/<sub-id>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/<account>"

# Resource Group-level
az role assignment create \
  --assignee <principal-id> \
  --role "Storage Blob Data Reader" \
  --scope "/subscriptions/<sub-id>/resourceGroups/<rg>"

# Subscription-level (least restrictive - use sparingly)
az role assignment create \
  --assignee <principal-id> \
  --role "Storage Blob Data Reader" \
  --scope "/subscriptions/<sub-id>"
```

## Common Scenarios

### Scenario 1: App Service Reading from Key Vault

**Requirements**: App needs to read secrets from Key Vault

**Solution**:
```bash
# Enable Managed Identity
az webapp identity assign \
  --name myapp \
  --resource-group myrg

# Get principal ID
PRINCIPAL_ID=$(az webapp identity show \
  --name myapp \
  --resource-group myrg \
  --query principalId -o tsv)

# Assign role at Key Vault scope
az role assignment create \
  --assignee $PRINCIPAL_ID \
  --role "Key Vault Secrets User" \
  --scope "/subscriptions/<sub-id>/resourceGroups/myrg/providers/Microsoft.KeyVault/vaults/mykeyvault"
```

### Scenario 2: Function App Writing to Blob Storage

**Requirements**: Function needs to create and update blobs

**Solution**:
```bash
# Enable Managed Identity on Function App
az functionapp identity assign \
  --name myfunc \
  --resource-group myrg

# Get principal ID
PRINCIPAL_ID=$(az functionapp identity show \
  --name myfunc \
  --resource-group myrg \
  --query principalId -o tsv)

# Assign role at storage account scope
az role assignment create \
  --assignee $PRINCIPAL_ID \
  --role "Storage Blob Data Contributor" \
  --scope "/subscriptions/<sub-id>/resourceGroups/myrg/providers/Microsoft.Storage/storageAccounts/mystorage"
```

### Scenario 3: CI/CD Pipeline Deploying Resources

**Requirements**: GitHub Actions deploying to resource group

**Solution**:
```bash
# Create service principal
az ad sp create-for-rbac \
  --name "github-actions-deploy" \
  --role Contributor \
  --scopes "/subscriptions/<sub-id>/resourceGroups/myrg" \
  --sdk-auth

# Note: Limit to resource group, not subscription
# Use the output JSON in GitHub Secrets
```

### Scenario 4: Read-Only Access for Auditing

**Requirements**: Security team needs view access

**Solution**:
```bash
# Assign Reader role at subscription level
az role assignment create \
  --assignee <user-principal-name> \
  --role "Reader" \
  --scope "/subscriptions/<sub-id>"

# Plus Security Reader for security insights
az role assignment create \
  --assignee <user-principal-name> \
  --role "Security Reader" \
  --scope "/subscriptions/<sub-id>"
```

## Custom Role Creation

When built-in roles are too broad:

### Example: Custom Storage Reader for Specific Container

```json
{
  "Name": "Custom Container Reader",
  "IsCustom": true,
  "Description": "Read-only access to specific blob containers",
  "Actions": [
    "Microsoft.Storage/storageAccounts/blobServices/containers/read"
  ],
  "NotActions": [],
  "DataActions": [
    "Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read"
  ],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/<subscription-id>/resourceGroups/<resource-group>"
  ]
}
```

**Create the role**:
```bash
az role definition create --role-definition custom-role.json
```

### Example: Custom Deployment Role

```json
{
  "Name": "App Deployer",
  "IsCustom": true,
  "Description": "Deploy web apps but cannot delete",
  "Actions": [
    "Microsoft.Web/sites/write",
    "Microsoft.Web/sites/config/write",
    "Microsoft.Web/sites/restart/action",
    "Microsoft.Web/sites/read"
  ],
  "NotActions": [
    "Microsoft.Web/sites/delete"
  ],
  "DataActions": [],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/<subscription-id>"
  ]
}
```

## Decision Matrix

| Scenario | Role | Scope | Notes |
|----------|------|-------|-------|
| App reads secrets | Key Vault Secrets User | Key Vault | Use Managed Identity |
| App writes blobs | Storage Blob Data Contributor | Storage Account | Avoid account keys |
| CI/CD deploys apps | Website Contributor | Resource Group | Not subscription |
| Read SQL data | Custom role | Database | Use SQL auth + RBAC |
| Monitor metrics | Monitoring Reader | Resource or RG | For dashboards |
| Security audit | Security Reader | Subscription | View-only |
| Manage everything | Contributor | Resource Group | Not Owner |

## Best Practices

### Principle of Least Privilege

1. **Start minimal**: Begin with most restrictive role
2. **Use resource-level scope**: Avoid subscription-wide assignments
3. **Prefer built-in roles**: Easier to maintain
4. **Use Managed Identity**: Eliminates credential management
5. **Regular reviews**: Remove unused permissions quarterly
6. **Separate duties**: Different roles for different functions

### Security Hardening

- **Enable Conditional Access** for privileged roles
- **Use Privileged Identity Management (PIM)** for just-in-time access
- **Implement approval workflows** for sensitive role assignments
- **Audit regularly**: Review role assignments monthly
- **Use Azure Policy**: Enforce RBAC standards
- **Create break-glass accounts**: For emergency access

### Monitoring and Auditing

```bash
# List all role assignments for a principal
az role assignment list \
  --assignee <principal-id> \
  --all \
  --output table

# List assignments in a resource group
az role assignment list \
  --resource-group myrg \
  --output table

# Check effective permissions
az role assignment list \
  --assignee <principal-id> \
  --scope <scope> \
  --include-inherited
```

## Troubleshooting

### Issue: "Insufficient Privileges" Error

**Causes**:
- Missing role assignment
- Wrong scope
- Permissions not propagated (wait 30 min)
- Managed Identity not enabled

**Solutions**:
```bash
# Verify role assignment exists
az role assignment list --assignee <principal-id>

# Check if Managed Identity is enabled
az webapp identity show --name myapp --resource-group myrg

# Verify scope matches resource
az role assignment list --scope <full-resource-id>
```

### Issue: Too Many Permissions

**Analysis**:
```bash
# Get all permissions for a principal
az role assignment list --assignee <principal-id> --all

# Review actual permissions used (check Azure Advisor)
```

**Resolution**:
1. Create custom role with only required actions
2. Reduce scope to specific resources
3. Remove unnecessary role assignments

### Issue: Cannot Assign Roles

**Causes**:
- Lack User Access Administrator or Owner role
- Subscription has restrictions
- Role assignment quota exceeded

**Solutions**:
```bash
# Check your permissions
az role assignment list --assignee <your-principal-id>

# Verify you can assign roles
az role definition list --name "User Access Administrator"
```

## Security Considerations

- **Never use Owner for applications** - Use Contributor instead
- **Avoid wildcard permissions** in custom roles
- **Rotate service principal credentials** (or use Managed Identity)
- **Monitor privileged assignments** with Azure Monitor alerts
- **Use groups for users** - Assign roles to groups, not individuals
- **Document all assignments** - Maintain an RBAC registry
- **Implement approval process** for production role assignments

## PowerShell Helper Scripts

### Analyze Managed Identity Permissions

```powershell
param([string]$ResourceName, [string]$ResourceGroup)

$identity = az webapp identity show `
    --name $ResourceName `
    --resource-group $ResourceGroup | ConvertFrom-Json

$assignments = az role assignment list `
    --assignee $identity.principalId `
    --all | ConvertFrom-Json

Write-Host "Managed Identity Permissions for $ResourceName"
Write-Host "Principal ID: $($identity.principalId)"
Write-Host ""

foreach ($assignment in $assignments) {
    Write-Host "Role: $($assignment.roleDefinitionName)"
    Write-Host "Scope: $($assignment.scope)"
    Write-Host ""
}
```

## References

- [Azure Built-in Roles](https://docs.microsoft.com/azure/role-based-access-control/built-in-roles)
- [Custom Roles](https://docs.microsoft.com/azure/role-based-access-control/custom-roles)
- [Managed Identities](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/)
- [RBAC Best Practices](https://docs.microsoft.com/azure/role-based-access-control/best-practices)
- [Azure AD PIM](https://docs.microsoft.com/azure/active-directory/privileged-identity-management/)
- [Zero Trust Security](https://docs.microsoft.com/security/zero-trust/)
