<?php

use App\Http\Controllers\Accounting\AccountChartController;
use App\Http\Controllers\ContentBlockController;
use App\Http\Controllers\HRM\JobController;
use App\Http\Controllers\LandingPagesController;
use App\Http\Controllers\TemplateController;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/jobs/{id}', [JobController::class, 'show'])->name('hrm.jobs.show');

Route::apiResource('templates', TemplateController::class);
// Route::apiResource('sections', SectionController::class);
// Route::apiResource('content-blocks', ContentBlockController::class);
// Route::apiResource('landing-pages', LandingPageController::class);
Route::get('/landing-pages/{slug}', [LandingPagesController::class, 'show']);

Route::get('/quote', function () {
    return response()->json([
        'quote' => Inspiring::plainQuote(),
    ]);
});

  // Balance Sheet Overview (Assets, Liabilities, Equity)
  Route::get('/balance-sheet-chart', [AccountChartController::class, 'getBalanceSheetChart']);

  // Income Statement Overview (Revenue, Expenses, Profit)
  Route::get('/income-statement-chart', [AccountChartController::class, 'getIncomeStatementChart']);

  // Tax Summary (Tax Paid/Payable)
  Route::get('/tax-summary-chart', [AccountChartController::class, 'getTaxSummaryChart']);

  // Cash Flow (Cash Inflows and Outflows)
  Route::get('/cash-flow-chart', [AccountChartController::class, 'getCashFlowChart']);

  // Expense Breakdown (Categories of Expenses)
  Route::get('/expense-breakdown-chart', [AccountChartController::class, 'getExpenseBreakdownChart']);

  // Profit and Loss Trend (Monthly Profit or Loss)
  Route::get('/profit-loss-trend-chart', [AccountChartController::class, 'getProfitLossTrendChart']);

  // Accounts Receivable/Payable Overview
  Route::get('/receivables-payables-chart', [AccountChartController::class, 'getReceivablesPayablesChart']);
