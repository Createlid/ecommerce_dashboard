// Function to fetch data from the specified API endpoint,
// render a chart using Chart.js, and customize the chart configuration
async function fetchDataAndRenderChart(apiEndpoint, chartElementId, chartConfig) {
  try {
    // Fetch data from the API endpoint
    let response = await fetch(apiEndpoint);
    let data = await response.json();

    // Get the canvas element to render the chart
    const ctx = document.getElementById(chartElementId).getContext("2d");

    // Create a new Chart instance with the provided configuration
    new Chart(ctx, chartConfig(data));
  } catch (error) {
    // Handle errors if fetching data or rendering chart fails
    console.error("Error fetching or rendering chart:", error);
  }
}

// Fetch and render chart for orders over time
fetchDataAndRenderChart("/api/orders_over_time", "ordersChart", (data) => ({
  type: "line",
  data: {
    labels: data.dates,
    datasets: [
      {
        label: "Number of Orders",
        data: data.counts,
        // Other dataset configurations can be added here
      },
    ],
  },
  // Other chart options can be added here
}));

// Fetch and render chart for low stock levels
fetchDataAndRenderChart("/api/low_stock_levels", "stockChart", (data) => ({
  type: "bar",
  data: {
    labels: data.products,
    datasets: [
      {
        label: "Low Stock",
        data: data.quantities,
        // Other dataset configurations can be added here
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        display: false, // This will hide the x-axis labels
      },
    },
  },
}));

// Fetch and render chart for most popular products
fetchDataAndRenderChart("/api/most_popular_products", "popularProductsChart", (data) => ({
  type: "bar",
  data: {
    labels: data.map((item) => item.product_name),
    datasets: [
      {
        label: "Quantity Sold",
        data: data.map((item) => item.total_quantity),
        // Other dataset configurations can be added here
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        display: false, // This will hide the x-axis labels
      },
    },
  },
}));

// Fetch and render chart for revenue generation
fetchDataAndRenderChart("/api/revenue_generation", "revenueChart", (data) => ({
  type: "line",
  data: {
    labels: data.dates,
    datasets: [
      {
        label: "Total Revenue",
        data: data.revenues,
        // Other dataset configurations can be added here
      },
    ],
  },
  // Other chart options can be added here
}));

// Fetch and render chart for product category popularity
fetchDataAndRenderChart("/api/product_category_popularity", "categoryPopularityChart", (data) => ({
  type: "pie",
  data: {
    labels: data.categories,
    datasets: [
      {
        label: "Total Sales",
        data: data.sales,
        // Other dataset configurations can be added here
      },
    ],
  },
}));

// Fetch and render chart for payment method popularity
fetchDataAndRenderChart("/api/payment_method_popularity", "paymentMethodChart", (data) => ({
  type: "pie",
  data: {
    labels: data.methods,
    datasets: [
      {
        label: "Transaction Count",
        data: data.counts,
        // Other dataset configurations can be added here
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        display: false, // This will hide the x-axis labels
      },
    },
  },
}));

// Fetch and render chart for temperature over time
fetchDataAndRenderChart("/api/temperature_over_time", "temperatureChart", (data) => ({
  type: "line",
  data: {
    labels: data.daily.time,
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.daily.temperature_2m_max,
        borderColor: "rgba(255, 0, 0, 1)",
        backgroundColor: "rgba(200, 0, 192, 0.2)",
        fill: false,
      },
    ],
  },
  // Other chart options can be added here
}));
