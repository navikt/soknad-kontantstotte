function fetchFaktum() {
    return fetch( '/fakta', {
        headers: [ [ 'Content-Type', 'application/json' ] ],
        method: 'GET',
    } )
        .then( ( response ) => {
            return response.json();
        } );
}

export {
    fetchFaktum,
};
