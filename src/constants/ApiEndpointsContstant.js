export const FAMILY_ENDPOINTS = {
    createFamily: '/families',
    getAllFamilies: '/families',
    getMembersOfFamily: (familyRef) => `/families/${familyRef}/members`,
    getFamily: (familyRef) => `/families/${familyRef}`,
    deleteFamily: (familyRef) => `/families/${familyRef}`
};

export const MEMBER_ENDPOINTS = {
    createMember: '/members'
};