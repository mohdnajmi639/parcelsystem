const calculatePrice = (parcelMock) => {
    let basePrice = 0;

    // 1. Determine Base Price from Categories
    if (parcelMock.categories && Array.isArray(parcelMock.categories)) {
        if (parcelMock.categories.includes('1kg')) {
            basePrice = 1;
        } else if (parcelMock.categories.includes('3kg')) {
            basePrice = 2;
        } else if (parcelMock.categories.includes('5kg')) {
            basePrice = 3;
        } else if (parcelMock.categories.includes('Above 5kg')) {
            basePrice = 5;
        }
    }

    if (parcelMock.basePrice) {
        basePrice = parcelMock.basePrice;
    }

    // 2. Calculate Overdue Penalty
    const now = new Date();
    const created = new Date(parcelMock.createdAt);
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let overdueMonths = 0;
    if (diffDays > 30) {
        overdueMonths = Math.floor((diffDays - 1) / 30);
    }

    const overdueCharge = overdueMonths * 20;
    const totalPrice = basePrice + overdueCharge;

    return {
        basePrice,
        overdueCharge,
        totalPrice,
        daysHeld: diffDays
    };
};

// --- TESTS ---
const runTest = (name, parcel, expectedPrice) => {
    const result = calculatePrice(parcel);
    const passed = result.totalPrice === expectedPrice;
    console.log(`Test: ${name}`);
    console.log(`  Expected: RM${expectedPrice}, Got: RM${result.totalPrice}`);
    console.log(`  Details: Base RM${result.basePrice}, Overdue RM${result.overdueCharge} (${result.daysHeld} days)`);
    console.log(`  Status: ${passed ? 'PASS' : 'FAIL'}`);
    console.log('---');
};

const makeDate = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d;
};

// Test Cases
runTest('1kg Fresh', { categories: ['1kg'], createdAt: makeDate(0) }, 1);
runTest('3kg Fresh', { categories: ['3kg'], createdAt: makeDate(10) }, 2);
runTest('5kg Fresh', { categories: ['5kg'], createdAt: makeDate(29) }, 3);

// Boundary: 30 days (Should be no penalty)
runTest('Above 5kg, 30 Days', { categories: ['Above 5kg'], createdAt: makeDate(30) }, 5);
// Boundary: 31 days (Should be penalty? 31 - 1 = 30 / 30 = 1 month overdue? Wait. (31-1)/30 = 1. Yes)
runTest('1kg, 31 Days (Overdue)', { categories: ['1kg'], createdAt: makeDate(31) }, 21); // 1 + 20

// 60 Days (Limit of first month penalty?)
// (60-1)/30 = 59/30 = 1.96 -> floor 1. Still RM20.
runTest('1kg, 60 Days', { categories: ['1kg'], createdAt: makeDate(60) }, 21);

// 61 Days (Second month penalty?)
// (61-1)/30 = 2. RM40.
runTest('1kg, 61 Days', { categories: ['1kg'], createdAt: makeDate(61) }, 41); // 1 + 40
