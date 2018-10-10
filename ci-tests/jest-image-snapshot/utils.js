function matchOptions(name) {
    return {
        customSnapshotsDir: './baseline/',
        customSnapshotIdentifier: name,
    };
}

const screenshotOptions = { fullPage: true };

async function takeSnapshot(name, page, size) {
    page.setViewport(size);
    await page.mouse.move(0, 0);
    const image = await page.screenshot(screenshotOptions);
    expect(image).toMatchImageSnapshot(matchOptions(name));
}

module.exports = {
    takeSnapshot,
};
