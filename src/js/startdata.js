module.exports = {
    // Load Mock Product Data Into localStorage
    init: function() {
        localStorage.clear();
        localStorage.setItem('businesses',JSON.stringify([
            {
                id: '00001',
                name: 'First Business',
                category: 'Technology',
                address: {
                    street: '89 West Main St',
                    city: 'Merrimac',
                    state: 'MA',
                    zipcode: '01860'
                },
                phone: '978-384-8273',
                email: 'support@firstbusiness.com',
                description: "But I can't give you this case, it don't belong to me."
            },
            {
                id: '00002',
                name: 'Second Business',
                category: 'Food',
                address: {
                    street: '22 Broad Main St',
                    city: 'Amesbury',
                    state: 'MA',
                    zipcode: '01913'
                },
                phone: '978-555-5555',
                email: 'support@secondbusiness.com',
                description: "Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass."
            }
        ]));
    }
};