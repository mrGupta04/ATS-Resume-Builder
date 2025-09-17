import { type NextRequest } from "next/server";
import puppeteer, { type Browser } from "puppeteer";
import puppeteerCore, { type Browser as BrowserCore } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Basic validation
  if (!searchParams.toString()) {
    return new Response(
      JSON.stringify({ message: "No query parameters provided" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    let browser: Browser | BrowserCore;

    // ✅ Choose Puppeteer engine based on environment
    if (
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL_ENV === "production"
    ) {
      const executablePath = await chromium.executablePath();

      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath,
        headless: chromium.headless,
      });
    } else {
      console.log("🚀 Launching Puppeteer in development mode");
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();

    // ✅ Correct BASE_URL handling
    const baseUrl =
      process.env.BASE_URL ||
      process.env.VERCEL_URL ||
      "http://localhost:3000"; // fallback for dev

    const url = new URL(`${baseUrl}/resume/download`);
    url.search = searchParams.toString();

    // Load resume page
    await page.goto(url.toString(), { waitUntil: "networkidle0" });

    // Ensure resume content exists
    await page.waitForSelector("#resume-content", {
      visible: true,
      timeout: 30000,
    });

    // Generate PDF buffer
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "10px",
        bottom: "20px",
        left: "10px",
      },
    });

    await browser.close();

    // ✅ Return PDF as Response
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume.pdf`,
      },
    });
  } catch (error) {
    console.error("❌ PDF generation error:", error);
    return new Response(
      JSON.stringify({
        message: "Error generating PDF",
        error: String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
