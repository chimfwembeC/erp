<?php

namespace App\Http\Controllers\Accounting;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Asset;
use App\Models\Liability;
use App\Models\Equity;
use App\Models\IncomeStatement;
use App\Models\Tax;
use App\Models\Expense;
use App\Models\Invoice;
use App\Models\CashFlow;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AccountChartController extends Controller
{
    // Balance Sheet Overview (Assets, Liabilities, Equity)
    public function getBalanceSheetChart()
    {
        $assets = Asset::selectRaw('SUM(value) as total_assets')
            ->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])
            ->first();

        $liabilities = Liability::selectRaw('SUM(amount) as total_liabilities')
            ->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])
            ->first();

        $equity = Equity::selectRaw('SUM(retained_earnings) as total_equity')
            ->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])
            ->first();

        return response()->json([
            'assets' => $assets->total_assets,
            'liabilities' => $liabilities->total_liabilities,
            'equity' => $equity->total_equity,
        ]);
    }

    // Income Statement Overview (Revenue, Expenses, Profit)
    public function getIncomeStatementChart()
    {
        $income = IncomeStatement::selectRaw('SUM(amount) as total_income')
            ->where('type', 'income')
            ->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])
            ->first();

        $expenses = IncomeStatement::selectRaw('SUM(amount) as total_expenses')
            ->where('type', 'expense')
            ->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])
            ->first();

        $netIncome = $income->total_income - $expenses->total_expenses;

        return response()->json([
            'income' => $income->total_income,
            'expenses' => $expenses->total_expenses,
            'net_income' => $netIncome,
        ]);
    }

    // Tax Summary (Tax Paid/Payable)
    public function getTaxSummaryChart()
    {
        // Fetch tax amounts from the invoice_taxes table
        $taxes = DB::table('invoice_taxes')
            ->join('taxes', 'invoice_taxes.tax_id', '=', 'taxes.id') // Join the taxes table to get the tax_name
            ->selectRaw('taxes.tax_name, SUM(invoice_taxes.tax_amount) as total_tax') // Sum the tax_amount
            ->groupBy('taxes.tax_name')
            ->whereBetween('invoice_taxes.created_at', [Carbon::now()->subMonth(), Carbon::now()]) // Filter by date range
            ->get();

        return response()->json($taxes->map(function ($tax) {
            return [
                'name' => $tax->tax_name,
                'value' => $tax->total_tax,
            ];
        }));
    }


    // Cash Flow (Cash Inflows and Outflows)
    public function getCashFlowChart()
    {
        // Get all inflows
        $inflows = CashFlow::where('type', 'inflow')
            ->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])
            ->get();

        // Get all outflows
        $outflows = CashFlow::where('type', 'outflow')
            ->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])
            ->get();

        return response()->json([
            'inflows' => $inflows->sum('amount'),
            'outflows' => $outflows->sum('amount'),
        ]);
    }

    // Expense Breakdown (Categories of Expenses)
    public function getExpenseBreakdownChart()
    {
        // Fetch expenses grouped by category for the chart
        $expensesByCategory = Expense::selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->get();

        return response()->json([
            'labels' => $expensesByCategory->pluck('category'),
            'data' => $expensesByCategory->pluck('total'),
        ]);
    }

    // Profit and Loss Trend (Monthly Profit or Loss)
    public function getProfitLossTrendChart()
    {
        $monthlyProfitLoss = IncomeStatement::selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->groupBy('month')
            ->whereBetween('created_at', [Carbon::now()->subYear(), Carbon::now()])
            ->get();

        return response()->json($monthlyProfitLoss->map(function ($item) {
            return [
                'month' => $item->month,
                'value' => $item->total,
            ];
        }));
    }

    // Accounts Receivable/Payable Overview
    public function getReceivablesPayablesChart()
    {
        $receivables = Invoice::selectRaw('SUM(amount) as total_receivables')
            ->where('status', 'unpaid')
            ->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])
            ->first();

        $payables = Invoice::selectRaw('SUM(amount) as total_payables')
            ->where('status', 'unpaid')
            ->whereBetween('created_at', [Carbon::now()->subMonth(), Carbon::now()])
            ->first();

        return response()->json([
            'receivables' => $receivables->total_receivables,
            'payables' => $payables->total_payables,
        ]);
    }
}
