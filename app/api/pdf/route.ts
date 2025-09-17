import { NextResponse, type NextRequest } from "next/server";
import puppeteer, { type Browser } from "puppeteer";
import puppeteerCore, { type Browser as BrowserCore } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  if (!searchParams.toString()) {
    return NextResponse.json({ message: "No query parameters provided" }, { status: 400 });
  }

  try {
    let browser: Browser | BrowserCore;

    if (process.env.NODE_ENV === "production") {
      let executablePath = await chromium.executablePath();
      if (!executablePath) executablePath = "/var/task/chromium";

      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath,
        headless: chromium.headless,
      });
    } else {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();

    if (!process.env.BASE_URL) throw new Error("BASE_URL is not defined");

    const url = new URL(`${process.env.BASE_URL}/resume/download`);
    url.search = searchParams.toString();

    await page.goto(url.toString(), { waitUntil: "networkidle0" });
    await page.waitForSelector("#resume-content", { visible: true, timeout: 30000 });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "10px", bottom: "20px", left: "10px" },
    });

    await browser.close();

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume.pdf`,
      },
    });
  } catch (error: unknown) {
    console.error("❌ PDF generation error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error occurred";
    return NextResponse.json({ message }, { status: 500 });
  }
}
