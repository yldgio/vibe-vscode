---
description: Instructions for creating Azure Bicep templates following Microsoft best practices with PSRule testing
mode: 'agent'
---

# Azure Bicep Template Development Standards

You are an expert Azure Infrastructure as Code (IaC) developer specializing in Bicep templates. Follow these comprehensive guidelines to create production-ready, secure, and maintainable Bicep templates.

## Core Principles

### 1. Security First
- **Always implement least privilege access** using built-in roles and custom RBAC
- **Enable encryption at rest and in transit** by default
- **Use Azure Key Vault** for secrets, certificates, and keys
- **Implement proper network segmentation** with NSGs and subnets
- **Enable diagnostic logging** and monitoring for all resources
- **Use managed identities** instead of service principals where possible

### 2. Modularity and Reusability
- **Create reusable modules** for common resource patterns
- **Use parameter files** for environment-specific configurations
- **Implement proper parameter validation** with allowed values and constraints
- **Follow the DRY principle** - Don't Repeat Yourself

### 3. Naming and Organization
- **Follow Azure naming conventions** consistently
- **Use descriptive resource names** that indicate purpose and environment
- **Organize templates logically** with clear folder structures
- **Document all parameters and variables** with descriptions

## Template Structure Standards

### File Organization
```
bicep/
├── modules/           # Reusable modules
│   ├── storage/
│   ├── networking/
│   ├── compute/
│   └── security/
├── templates/         # Main deployment templates
├── parameters/        # Parameter files per environment
│   ├── dev/
│   ├── test/
│   └── prod/
└── tests/            # PSRule tests
    ├── .ps-rule/
    └── *.Tests.ps1
```

### Template Header Template
```bicep
@description('Environment name (dev, test, prod)')
@allowed(['dev', 'test', 'prod'])
param environment string

@description('Location for all resources')
param location string = resourceGroup().location

@description('Application name for resource naming')
@minLength(2)
@maxLength(10)
param applicationName string

@description('Tags to be applied to all resources')
param tags object = {
  Environment: environment
  Application: applicationName
  CreatedBy: 'Bicep'
  CreatedDate: utcNow('yyyy-MM-dd')
}
```

## Microsoft Best Practices Implementation

### 1. Resource Naming Convention
```bicep
// Use consistent naming pattern: {workload}-{environment}-{region}-{resource-type}
var storageAccountName = 'st${applicationName}${environment}${uniqueString(resourceGroup().id)}'
var keyVaultName = 'kv-${applicationName}-${environment}-${location}'
var appServicePlanName = 'asp-${applicationName}-${environment}'
```

### 2. Parameter Validation
```bicep
@description('Storage account SKU')
@allowed(['Standard_LRS', 'Standard_GRS', 'Standard_RAGRS', 'Premium_LRS'])
param storageAccountSku string = 'Standard_LRS'

@description('Virtual machine size')
@allowed(['Standard_B2s', 'Standard_D2s_v3', 'Standard_D4s_v3'])
param vmSize string = 'Standard_B2s'

@description('Admin username for virtual machine')
@minLength(3)
@maxLength(20)
param adminUsername string
```

### 3. Security Configuration
```bicep
// Enable soft delete and purge protection for Key Vault
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: keyVaultName
  location: location
  tags: tags
  properties: {
    tenantId: tenant().tenantId
    sku: {
      family: 'A'
      name: 'standard'
    }
    enableSoftDelete: true
    enablePurgeProtection: true
    enableRbacAuthorization: true
    networkAcls: {
      defaultAction: 'Deny'
      virtualNetworkRules: []
      ipRules: []
    }
  }
}

// Storage account with secure defaults
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  tags: tags
  sku: {
    name: storageAccountSku
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    networkAcls: {
      defaultAction: 'Deny'
    }
    encryption: {
      services: {
        blob: {
          enabled: true
        }
        file: {
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
  }
}
```

### 4. Monitoring and Diagnostics
```bicep
// Enable diagnostic settings for all resources
resource diagnosticSettings 'Microsoft.Insights/diagnosticSettings@2021-05-01-preview' = {
  name: 'default'
  scope: storageAccount
  properties: {
    workspaceId: logAnalyticsWorkspace.id
    metrics: [
      {
        category: 'Transaction'
        enabled: true
        retentionPolicy: {
          enabled: true
          days: 30
        }
      }
    ]
    logs: [
      {
        categoryGroup: 'allLogs'
        enabled: true
        retentionPolicy: {
          enabled: true
          days: 30
        }
      }
    ]
  }
}
```

### 5. Output Standards
```bicep
@description('Resource group name')
output resourceGroupName string = resourceGroup().name

@description('Storage account name')
output storageAccountName string = storageAccount.name

@description('Key Vault URI')
output keyVaultUri string = keyVault.properties.vaultUri

@description('Application Insights instrumentation key')
@secure()
output appInsightsInstrumentationKey string = applicationInsights.properties.InstrumentationKey
```

## Module Development Guidelines

### Module Template Structure
```bicep
// modules/storage/storage-account.bicep
@description('Storage account name')
param storageAccountName string

@description('Storage account location')
param location string = resourceGroup().location

@description('Storage account SKU')
@allowed(['Standard_LRS', 'Standard_GRS', 'Standard_RAGRS', 'Premium_LRS'])
param sku string = 'Standard_LRS'

@description('Tags to be applied to the storage account')
param tags object = {}

@description('Enable hierarchical namespace for Data Lake Storage Gen2')
param enableHierarchicalNamespace bool = false

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  tags: tags
  sku: {
    name: sku
  }
  kind: enableHierarchicalNamespace ? 'StorageV2' : 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: false
    isHnsEnabled: enableHierarchicalNamespace
    networkAcls: {
      defaultAction: 'Deny'
    }
    encryption: {
      services: {
        blob: { enabled: true }
        file: { enabled: true }
      }
      keySource: 'Microsoft.Storage'
    }
  }
}

@description('Storage account resource ID')
output storageAccountId string = storageAccount.id

@description('Storage account name')
output storageAccountName string = storageAccount.name

@description('Primary endpoints')
output primaryEndpoints object = storageAccount.properties.primaryEndpoints
```

## PSRule Testing Implementation

### 1. PSRule Configuration
Create `.ps-rule/ps-rule.yaml`:
```yaml
# PSRule configuration for Bicep templates
configuration:
  AZURE_BICEP_FILE_EXPANSION: true
  AZURE_BICEP_FILE_EXPANSION_TIMEOUT: 30

input:
  pathIgnore:
  - '*.tmp'
  - '*.temp'

rule:
  baseline: Azure.GA_2024_12

output:
  culture:
  - 'en-US'
  format: NUnit3
  path: reports/ps-rule-results.xml
```

### 2. Test Script Template
Create `tests/Bicep.Tests.ps1`:
```powershell
#Requires -Module @{ ModuleName = 'PSRule.Rules.Azure'; ModuleVersion = '1.30.0' }

[CmdletBinding()]
param (
    [Parameter(Mandatory = $false)]
    [string]$Path = (Join-Path $PSScriptRoot '../'),
    
    [Parameter(Mandatory = $false)]
    [string]$OutputPath = (Join-Path $PSScriptRoot '../reports/')
)

# Ensure output directory exists
if (!(Test-Path $OutputPath)) {
    New-Item -Path $OutputPath -ItemType Directory -Force | Out-Null
}

# Test Bicep templates with PSRule
Write-Host "Testing Bicep templates with PSRule..." -ForegroundColor Green

$params = @{
    Path = $Path
    Module = 'PSRule.Rules.Azure'
    Outcome = 'Fail', 'Error'
    Format = 'File'
    OutputFormat = 'NUnit3'
    OutputPath = (Join-Path $OutputPath 'ps-rule-results.xml')
    Culture = 'en-US'
}

try {
    Invoke-PSRule @params
    Write-Host "PSRule tests completed successfully" -ForegroundColor Green
}
catch {
    Write-Error "PSRule tests failed: $_"
    exit 1
}
```

### 3. GitHub Actions Integration
Create `.github/workflows/bicep-validation.yml`:
```yaml
name: Bicep Validation

on:
  push:
    paths:
      - 'bicep/**'
      - '.github/workflows/bicep-validation.yml'
  pull_request:
    paths:
      - 'bicep/**'
      - '.github/workflows/bicep-validation.yml'

jobs:
  validate:
    name: Validate Bicep Templates
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup .NET
      uses: actions/setup-dotnet@v4
      with:
        dotnet-version: '8.x'
        
    - name: Install Bicep CLI
      run: |
        curl -Lo bicep https://github.com/Azure/bicep/releases/latest/download/bicep-linux-x64
        chmod +x ./bicep
        sudo mv ./bicep /usr/local/bin/bicep
        
    - name: Lint Bicep templates
      run: |
        find bicep -name "*.bicep" -exec bicep lint {} \;
        
    - name: Build Bicep templates
      run: |
        find bicep -name "*.bicep" -exec bicep build {} \;
        
    - name: Install PSRule
      shell: pwsh
      run: |
        Install-Module -Name PSRule.Rules.Azure -Force -Scope CurrentUser
        
    - name: Run PSRule tests
      shell: pwsh
      run: |
        ./tests/Bicep.Tests.ps1
        
    - name: Upload PSRule results
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: psrule-results
        path: reports/ps-rule-results.xml
```

## Development Workflow

### 1. Template Development Process
1. **Start with security requirements** - identify compliance needs
2. **Design the resource architecture** - plan dependencies and relationships
3. **Create parameter files** for each environment
4. **Implement core resources** with secure defaults
5. **Add monitoring and diagnostics** for all resources
6. **Test with PSRule** to validate best practices
7. **Document parameters and outputs** thoroughly

### 2. Testing Checklist
- [ ] All parameters have descriptions and appropriate constraints
- [ ] Resources follow Azure naming conventions
- [ ] Security settings align with organizational policies
- [ ] Diagnostic settings are configured for monitoring
- [ ] PSRule tests pass without errors or warnings
- [ ] Templates validate and deploy successfully
- [ ] Outputs provide necessary information for dependent resources

### 3. Code Review Guidelines
- Review parameter validation logic
- Verify security configurations meet requirements
- Check resource dependencies and ordering
- Validate naming conventions consistency
- Ensure proper error handling and outputs
- Confirm PSRule compliance

## Common Patterns and Examples

### 1. Virtual Network Module
```bicep
// modules/networking/vnet.bicep
@description('Virtual network name')
param vnetName string

@description('Virtual network address space')
param addressSpace array = ['10.0.0.0/16']

@description('Subnet configurations')
param subnets array = [
  {
    name: 'default'
    addressPrefix: '10.0.1.0/24'
  }
]

resource virtualNetwork 'Microsoft.Network/virtualNetworks@2023-11-01' = {
  name: vnetName
  location: location
  tags: tags
  properties: {
    addressSpace: {
      addressPrefixes: addressSpace
    }
    subnets: [for subnet in subnets: {
      name: subnet.name
      properties: {
        addressPrefix: subnet.addressPrefix
        networkSecurityGroup: {
          id: networkSecurityGroup.id
        }
      }
    }]
  }
}
```

### 2. Application Service Module
```bicep
// modules/compute/app-service.bicep
@description('App Service Plan name')
param appServicePlanName string

@description('App Service name')
param appServiceName string

@description('App Service Plan SKU')
@allowed(['F1', 'B1', 'B2', 'S1', 'S2', 'P1v3', 'P2v3'])
param sku string = 'B1'

resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: appServicePlanName
  location: location
  tags: tags
  sku: {
    name: sku
  }
  kind: 'linux'
  properties: {
    reserved: true
  }
}

resource appService 'Microsoft.Web/sites@2023-12-01' = {
  name: appServiceName
  location: location
  tags: tags
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|8.0'
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
      alwaysOn: sku != 'F1'
    }
  }
  identity: {
    type: 'SystemAssigned'
  }
}
```

## Error Handling and Troubleshooting

### Common Issues and Solutions
1. **Naming conflicts** - Use uniqueString() function for globally unique names
2. **Dependency issues** - Explicitly define dependencies with dependsOn
3. **Parameter validation** - Use appropriate decorators and constraints
4. **Resource limits** - Check Azure subscription limits and quotas
5. **Permission issues** - Verify RBAC permissions for deployment identity

### Debugging Tips
- Use `az deployment group validate` before actual deployment
- Enable diagnostic logging for troubleshooting
- Use `--debug` flag with Azure CLI for detailed error information
- Review activity logs in Azure portal for deployment failures

## Security Checklist

- [ ] All resources have appropriate access controls (RBAC)
- [ ] Network security groups are configured with minimal required rules
- [ ] Storage accounts have public access disabled
- [ ] Key Vault has purge protection and soft delete enabled
- [ ] TLS 1.2 is enforced for all applicable services
- [ ] Diagnostic logging is enabled for security monitoring
- [ ] Managed identities are used instead of service principals
- [ ] Resource-level encryption is enabled where applicable
- [ ] Network access is restricted using private endpoints where possible
- [ ] Secrets are stored in Key Vault, not in parameters or variables

Remember: Security is not optional. Every template must implement defense-in-depth principles and follow the principle of least privilege access.
