---
name: DOCX Document Generation
description: Generate and manipulate Microsoft Word (.docx) documents programmatically using modern libraries
---

# DOCX Document Generation

This skill helps you create, modify, and generate Microsoft Word documents programmatically for reports, contracts, invoices, and other business documents.

## When to Use This Skill

Use this skill when you need to:
- Generate reports and documents automatically
- Create templates with dynamic content
- Programmatically fill in contracts or forms
- Convert data to formatted Word documents
- Automate document generation in workflows
- Create invoices, proposals, or letters

## Core Concepts

DOCX files are ZIP archives containing XML files. Libraries abstract this complexity, allowing you to:
- Create paragraphs and text runs with formatting
- Add tables, images, headers, and footers
- Apply styles and themes
- Insert page breaks and sections
- Generate table of contents
- Add bullet and numbered lists

## Library Options

### JavaScript/TypeScript: docx

**Installation:**
```bash
npm install docx
```

**Basic Document:**
```typescript
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as fs from 'fs';

// Create document
const doc = new Document({
  sections: [{
    properties: {},
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: "Hello World",
            bold: true,
            size: 28
          }),
        ],
      }),
    ],
  }],
});

// Generate and save
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("MyDocument.docx", buffer);
});
```

### Python: python-docx

**Installation:**
```bash
pip install python-docx
```

**Basic Document:**
```python
from docx import Document
from docx.shared import Pt, RGBColor

# Create document
doc = Document()

# Add heading
doc.add_heading('Document Title', 0)

# Add paragraph
paragraph = doc.add_paragraph('This is a paragraph with ')
run = paragraph.add_run('bold')
run.bold = True
paragraph.add_run(' and ')
run = paragraph.add_run('italic')
run.italic = True
paragraph.add_run(' text.')

# Save
doc.save('document.docx')
```

## Common Patterns

### Report with Header and Footer

```typescript
import { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType } from 'docx';

const doc = new Document({
  sections: [{
    properties: {
      page: {
        margin: {
          top: 720,  // 0.5 inch
          right: 720,
          bottom: 720,
          left: 720,
        },
      },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Company Name - Monthly Report",
                color: "666666",
                size: 20,
              }),
            ],
          }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Page ",
                size: 18,
              }),
              new TextRun({
                children: ["PAGE_NUMBER"],
                size: 18,
              }),
              new TextRun({
                text: " of ",
                size: 18,
              }),
              new TextRun({
                children: ["TOTAL_PAGES"],
                size: 18,
              }),
            ],
          }),
        ],
      }),
    },
    children: [
      new Paragraph({
        text: "Report Content",
        heading: "Heading1",
      }),
      // ... more content
    ],
  }],
});
```

### Table Generation

```typescript
import { Table, TableCell, TableRow, WidthType } from 'docx';

const table = new Table({
  width: {
    size: 100,
    type: WidthType.PERCENTAGE,
  },
  rows: [
    // Header row
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph("Product")],
          shading: { fill: "2E75B5" },
        }),
        new TableCell({
          children: [new Paragraph("Quantity")],
          shading: { fill: "2E75B5" },
        }),
        new TableCell({
          children: [new Paragraph("Price")],
          shading: { fill: "2E75B5" },
        }),
      ],
    }),
    // Data rows
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Widget A")] }),
        new TableCell({ children: [new Paragraph("10")] }),
        new TableCell({ children: [new Paragraph("$99.99")] }),
      ],
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph("Widget B")] }),
        new TableCell({ children: [new Paragraph("5")] }),
        new TableCell({ children: [new Paragraph("$149.99")] }),
      ],
    }),
  ],
});
```

### Invoice Generator

```typescript
interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Invoice {
  invoiceNumber: string;
  date: string;
  customerName: string;
  items: InvoiceItem[];
}

function generateInvoice(invoice: Invoice): Document {
  const subtotal = invoice.items.reduce((sum, item) => 
    sum + (item.quantity * item.unitPrice), 0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  return new Document({
    sections: [{
      children: [
        // Header
        new Paragraph({
          text: "INVOICE",
          heading: "Heading1",
          alignment: AlignmentType.CENTER,
        }),
        
        // Invoice details
        new Paragraph({
          children: [
            new TextRun({ text: "Invoice #: ", bold: true }),
            new TextRun(invoice.invoiceNumber),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Date: ", bold: true }),
            new TextRun(invoice.date),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Customer: ", bold: true }),
            new TextRun(invoice.customerName),
          ],
        }),
        
        new Paragraph({ text: "" }), // Spacing
        
        // Items table
        new Table({
          rows: [
            // Header
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ children: [new Paragraph("Description")] }),
                new TableCell({ children: [new Paragraph("Qty")] }),
                new TableCell({ children: [new Paragraph("Unit Price")] }),
                new TableCell({ children: [new Paragraph("Total")] }),
              ],
            }),
            // Items
            ...invoice.items.map(item => new TableRow({
              children: [
                new TableCell({ children: [new Paragraph(item.description)] }),
                new TableCell({ children: [new Paragraph(item.quantity.toString())] }),
                new TableCell({ children: [new Paragraph(`$${item.unitPrice.toFixed(2)}`)] }),
                new TableCell({ children: [new Paragraph(`$${(item.quantity * item.unitPrice).toFixed(2)}`)] }),
              ],
            })),
          ],
        }),
        
        new Paragraph({ text: "" }), // Spacing
        
        // Totals
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: `Subtotal: $${subtotal.toFixed(2)}` }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ text: `Tax (10%): $${tax.toFixed(2)}` }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({ 
              text: `Total: $${total.toFixed(2)}`,
              bold: true,
              size: 28
            }),
          ],
        }),
      ],
    }],
  });
}

// Usage
const invoice: Invoice = {
  invoiceNumber: "INV-001",
  date: "2024-01-18",
  customerName: "Acme Corporation",
  items: [
    { description: "Consulting Services", quantity: 10, unitPrice: 150 },
    { description: "Software License", quantity: 1, unitPrice: 500 },
  ],
};

const doc = generateInvoice(invoice);
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(`invoice-${invoice.invoiceNumber}.docx`, buffer);
});
```

### Python Report with Charts

```python
from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH
import matplotlib.pyplot as plt

# Create document
doc = Document()

# Add title
doc.add_heading('Sales Report - Q1 2024', 0)

# Add executive summary
doc.add_heading('Executive Summary', level=1)
doc.add_paragraph(
    'This quarter showed strong growth across all product lines...'
)

# Add chart
fig, ax = plt.subplots()
categories = ['Product A', 'Product B', 'Product C']
values = [45, 30, 25]
ax.bar(categories, values)
ax.set_ylabel('Sales (thousands)')
ax.set_title('Q1 Sales by Product')

# Save chart as image
chart_path = 'sales_chart.png'
plt.savefig(chart_path)
plt.close()

# Add chart to document
doc.add_picture(chart_path, width=Inches(5))

# Add table
doc.add_heading('Detailed Breakdown', level=1)
table = doc.add_table(rows=1, cols=3)
table.style = 'Light Grid Accent 1'

# Header row
header_cells = table.rows[0].cells
header_cells[0].text = 'Product'
header_cells[1].text = 'Units Sold'
header_cells[2].text = 'Revenue'

# Data rows
data = [
    ('Product A', '4,500', '$450,000'),
    ('Product B', '3,000', '$300,000'),
    ('Product C', '2,500', '$250,000'),
]

for product, units, revenue in data:
    row_cells = table.add_row().cells
    row_cells[0].text = product
    row_cells[1].text = units
    row_cells[2].text = revenue

# Save document
doc.save('sales_report.docx')
```

## Styling and Formatting

### Custom Styles

```typescript
import { Document, Paragraph, TextRun, AlignmentType, UnderlineType } from 'docx';

const doc = new Document({
  sections: [{
    children: [
      new Paragraph({
        text: "Styled Heading",
        heading: "Heading1",
        spacing: {
          after: 200,
        },
      }),
      
      new Paragraph({
        children: [
          new TextRun({
            text: "This text is ",
            font: "Calibri",
            size: 24, // 12pt (size is in half-points)
          }),
          new TextRun({
            text: "bold",
            bold: true,
          }),
          new TextRun({
            text: ", ",
          }),
          new TextRun({
            text: "italic",
            italics: true,
          }),
          new TextRun({
            text: ", and ",
          }),
          new TextRun({
            text: "underlined",
            underline: {
              type: UnderlineType.SINGLE,
            },
          }),
        ],
      }),
      
      new Paragraph({
        children: [
          new TextRun({
            text: "Colored text",
            color: "FF0000",
            size: 28,
          }),
        ],
        alignment: AlignmentType.CENTER,
      }),
    ],
  }],
});
```

### Bullet Lists

```typescript
new Paragraph({
  text: "First item",
  bullet: {
    level: 0,
  },
}),
new Paragraph({
  text: "Second item",
  bullet: {
    level: 0,
  },
}),
new Paragraph({
  text: "Nested item",
  bullet: {
    level: 1,
  },
}),
```

## Template Filling

### Python Template Approach

```python
from docx import Document

def fill_template(template_path, output_path, replacements):
    """
    Fill a Word template with data
    
    replacements: dict of {placeholder: value}
    e.g., {"{{NAME}}": "John Doe", "{{DATE}}": "2024-01-18"}
    """
    doc = Document(template_path)
    
    # Replace in paragraphs
    for paragraph in doc.paragraphs:
        for placeholder, value in replacements.items():
            if placeholder in paragraph.text:
                paragraph.text = paragraph.text.replace(placeholder, str(value))
    
    # Replace in tables
    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for placeholder, value in replacements.items():
                    if placeholder in cell.text:
                        cell.text = cell.text.replace(placeholder, str(value))
    
    doc.save(output_path)

# Usage
fill_template(
    'contract_template.docx',
    'contract_filled.docx',
    {
        "{{CLIENT_NAME}}": "Acme Corp",
        "{{START_DATE}}": "2024-02-01",
        "{{END_DATE}}": "2024-12-31",
        "{{AMOUNT}}": "$50,000"
    }
)
```

## Best Practices

### Document Organization
- **Use proper heading levels**: For table of contents and navigation
- **Apply consistent styles**: Use built-in or custom styles
- **Structure with sections**: Separate chapters, appendices
- **Add page numbers**: In headers or footers

### Performance
- **Batch operations**: Group similar formatting operations
- **Reuse styles**: Don't recreate styles for each element
- **Optimize images**: Compress before adding to document
- **Stream large documents**: For very large files, consider streaming APIs

### Compatibility
- **Test in Microsoft Word**: Verify rendering
- **Use standard fonts**: Calibri, Arial, Times New Roman
- **Avoid complex formatting**: For better compatibility
- **Provide fallbacks**: For custom fonts or features

## Common Use Cases

### 1. Automated Reports
- Financial statements
- Analytics dashboards
- Status reports
- Audit logs

### 2. Document Generation
- Contracts and agreements
- Proposals and quotes
- Certificates and awards
- Letters and correspondence

### 3. Data Export
- Database records to Word
- Survey results compilation
- Meeting minutes from notes
- Product catalogs

## Error Handling

```typescript
async function generateDocument(data: any): Promise<void> {
  try {
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({ text: data.title || "Untitled Document" }),
          // ... more content
        ],
      }],
    });
    
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync('output.docx', buffer);
    console.log('Document generated successfully');
  } catch (error) {
    console.error('Error generating document:', error);
    throw new Error('Failed to generate document');
  }
}
```

## References

- [docx (JavaScript/TypeScript)](https://docx.js.org/)
- [python-docx Documentation](https://python-docx.readthedocs.io/)
- [Office Open XML Specification](http://officeopenxml.com/)
- [Word Document Structure](https://docs.microsoft.com/en-us/office/open-xml/word-processing)
