import { User } from "../types/user";

const checkIncompleteUserData = (userData: User) => {
    const missingFields: string[] = [];
    if (!userData.city) missingFields.push('Şehir');
    if (!userData.birthDay) missingFields.push('Doğum Günü');
    if (!userData.birthMonth) missingFields.push('Doğum Ayı');
    if (!userData.birthYear) missingFields.push('Doğum Yılı');
    if (!userData.birthMinute) missingFields.push('Doğum Dakikası');
    if (!userData.birthHour) missingFields.push('Doğum Saati');
    if (!userData.gender) missingFields.push('Cinsiyet');
    
    return missingFields;
}   

export { checkIncompleteUserData };