import { expect, test } from "@playwright/test";

const search = (page) => page.getByPlaceholder("Search collections and snippets...");
const cards = (page) => page.locator(".av-detail-grid .av-card");

test("create, edit and delete a snippet, preserving each change across reloads", async ({ page }) => {
  await page.goto("/app");
  await page.locator(".av-card-grid").getByText("React Hooks", { exact: true }).click();
  await page.getByRole("button", { name: "+ New note", exact: true }).click();
  const drawer = page.locator(".av-drawer.open");
  await drawer.getByPlaceholder("e.g. useDebounce").fill("Portfolio fixture");
  await drawer.getByPlaceholder("Why did you save this?").fill("Browser persistence regression");
  await drawer.locator(".ace_content").click();
  await page.keyboard.insertText("export const portfolioMarker = 42;");
  await drawer.getByRole("button", { name: "Save note", exact: true }).click();
  await search(page).fill("Portfolio fixture");
  await expect(cards(page)).toHaveCount(1);

  await page.reload();
  await search(page).fill("Portfolio fixture");
  await expect(cards(page)).toHaveCount(1);
  await cards(page).click();
  await expect(drawer.getByPlaceholder("e.g. useDebounce")).toHaveValue("Portfolio fixture");
  await expect(drawer.locator(".ace_content")).toContainText("portfolioMarker");
  await drawer.getByPlaceholder("e.g. useDebounce").fill("Portfolio fixture updated");
  await drawer.getByRole("button", { name: "Save note", exact: true }).click();
  await expect(cards(page)).toContainText("Portfolio fixture updated");

  await page.reload();
  await search(page).fill("Portfolio fixture");
  await expect(cards(page)).toContainText("Portfolio fixture updated");
  await cards(page).getByTitle("Delete", { exact: true }).click();
  await expect(cards(page)).toHaveCount(0);
  await page.reload();
  await search(page).fill("Portfolio fixture");
  await expect(cards(page)).toHaveCount(0);
});

test("search includes code, ignores case and combines with language filtering", async ({ page }) => {
  await page.goto("/app");
  await search(page).fill("FLATTEN_DICT");
  await expect(cards(page)).toHaveCount(1);
  await expect(cards(page)).toContainText("flatten_dict");
  await search(page).fill("parent_key");
  await expect(cards(page)).toHaveCount(1);
  await page.getByTitle("Python", { exact: true }).click();
  await expect(cards(page)).toHaveCount(1);
  await page.getByTitle("JavaScript", { exact: true }).click();
  await expect(cards(page)).toHaveCount(0);
});

test("collection creation is normalized and survives a reload", async ({ page }) => {
  await page.goto("/app");
  await page.getByRole("button", { name: "New Collection", exact: true }).click();
  const modal = page.locator(".av-modal-overlay.open");
  await modal.getByPlaceholder("e.g. GraphQL Snippets").fill("  QA   snippets  ");
  await modal.getByRole("button", { name: "Create", exact: true }).click();
  await expect(page.locator(".av-coll-card").filter({ hasText: "QA snippets" })).toHaveCount(1);
  await page.reload();
  await expect(page.locator(".av-coll-card").filter({ hasText: "QA snippets" })).toHaveCount(1);
});
