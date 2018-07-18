import { ClientFunction, Selector } from 'testcafe';

const getWindowLocation = ClientFunction(() => window.location);

fixture('veiledningsside').page('http://ci-test-server:8000/');

test('viser overskrift', async t => {
    await t.expect(Selector('h1').innerText).eql('Veiledningsside');
});

test('start søknad', async t => {
    await t.click('.knapp.knapp--hoved');
    const location = await getWindowLocation();

    await t.expect(location.pathname).eql('/start');
});
