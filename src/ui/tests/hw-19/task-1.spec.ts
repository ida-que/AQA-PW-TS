// Open the https://the-internet.herokuapp.com/ website
// Locate and click the Dynamic Controls link
// Validate the checkbox
// Click the "Remove" button
// Wait for the checkbox to be removed
// Verify the presence of the "Add" button
// Validate the "It's gone!" text
// Click the "Add" button
// Wait for the checkbox to appear
// Validate the "It's back!" text

import { test, expect } from '@playwright/test';

test('Dynamic controls', async ({page}) => {
    const dynamicControlsLink = page.getByRole('link', { name: 'Dynamic Controls' });
    const checkbox = page.getByRole('checkbox');
    const addButton = page.getByRole('button', { name: 'Add' });
    const removeButton = page.getByRole('button', { name: 'Remove' });
    const itsGoneText = page.getByText('It\'s gone!');
    const itsBackText = page.getByText('It\'s back!');

    await page.goto('https://the-internet.herokuapp.com/');
    
    await dynamicControlsLink.click();
    await checkbox.check();
    await removeButton.click();
    await expect(checkbox).not.toBeVisible();
    await expect(addButton).toBeVisible();
    await expect(itsGoneText).toBeVisible(); 
    await addButton.click();
    await expect(checkbox).toBeVisible();
    await expect(itsBackText).toBeVisible();
});