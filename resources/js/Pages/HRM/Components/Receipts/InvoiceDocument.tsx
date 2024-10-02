import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
} from '@react-pdf/renderer';

// Register Custom Font (Optional)
// Font.register({
//     family: 'Open Sans',
//     src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf',
// });

// Custom Styles
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica', // Change to 'Open Sans' if custom font is registered
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 60,
        height: 60,
    },
    companyInfo: {
        textAlign: 'right',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        textDecoration: 'underline',
    },
    dottedLine: {
        borderBottomStyle: 'dashed',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    table: {
        display: 'table',
        width: 'auto',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '25%',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        fontWeight: 'bold',
    },
    tableCol: {
        width: '25%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableCellHeader: {
        margin: 5,
        fontWeight: 'bold',
    },
    tableCell: {
        margin: 5,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    totalLabel: {
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 'auto',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#000',
        textAlign: 'center',
        fontSize: 10,
    },
});

const InvoiceDocument = ({ invoiceData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header Section */}
            <View style={styles.header}>
                {/* Company Logo */}
                <Image
                    style={styles.logo}
                    src={invoiceData.companyLogoUrl}
                />
                {/* Company Details */}
                <View style={styles.companyInfo}>
                    <Text style={styles.title}>INVOICE</Text>
                    <Text>{invoiceData.companyName}</Text>
                    <Text>{invoiceData.companyAddress}</Text>
                    <Text>{invoiceData.companyEmail}</Text>
                    <Text>{invoiceData.companyPhone}</Text>
                </View>
            </View>

            {/* Invoice Details */}
            <View style={styles.section}>
                <Text>Invoice #: {invoiceData.invoiceNumber}</Text>
                <Text>Date: {invoiceData.date}</Text>
                <Text>Due Date: {invoiceData.dueDate}</Text>
                <Text>Terms: {invoiceData.paymentTerms}</Text>
            </View>

            {/* Dotted Line */}
            <View style={styles.dottedLine} />

            {/* Bill To Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bill To:</Text>
                <Text>{invoiceData.customerName}</Text>
                <Text>{invoiceData.customerAddress}</Text>
                <Text>{invoiceData.customerEmail}</Text>
                <Text>{invoiceData.customerPhone}</Text>
            </View>

            {/* Dotted Line */}
            <View style={styles.dottedLine} />

            {/* Itemized Invoice Table */}
            <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Description</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Quantity</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Unit Price</Text>
                    </View>
                    <View style={styles.tableColHeader}>
                        <Text style={styles.tableCellHeader}>Amount</Text>
                    </View>
                </View>
                {/* Table Rows */}
                {invoiceData.items.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.description}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.quantity}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                ${item.unitPrice.toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>
                                ${(item.quantity * item.unitPrice).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Total Amounts */}
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal: </Text>
                <Text>${invoiceData.subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax: </Text>
                <Text>${invoiceData.tax.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total: </Text>
                <Text>${invoiceData.total.toFixed(2)}</Text>
            </View>

            {/* Dotted Line */}
            <View style={styles.dottedLine} />

            {/* Footer */}
            <View style={styles.footer}>
                <Text>{invoiceData.footerNote}</Text>
                <Text>{invoiceData.companyName} | {invoiceData.companyWebsite}</Text>
            </View>
        </Page>
    </Document>
);

export default InvoiceDocument;
