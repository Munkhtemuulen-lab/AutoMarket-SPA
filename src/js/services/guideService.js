// 2.12: санамж/гарын авлагын local JSON мэдээлэл
const fallback = [
 {id:'inspection',icon:'✓',titleMn:'Худалдан авахын өмнө шалгах зүйлс',titleEn:'Before-you-buy checklist',bodyMn:'Гэрчилгээ, арлын дугаар, гүйлт, техникийн нөхцөлийг шалгаарай.',bodyEn:'Check the registration, VIN, mileage and condition.'},
 {id:'finance',icon:'₮',titleMn:'Лизингийн тооцооллыг ойлгох',titleEn:'Understanding auto financing',bodyMn:'Хүү, урьдчилгаа, хугацаа, нийт зардлыг харьцуул.',bodyEn:'Compare rates, deposits, term and total costs.'},
 {id:'listing',icon:'▤',titleMn:'Зар зөв оруулах зөвлөмж',titleEn:'Writing a good listing',bodyMn:'Машины мэдээллийг үнэн зөв, ойлгомжтой оруул.',bodyEn:'Use accurate and clear vehicle details.'}
];
export async function loadGuides(){
 try {const response=await fetch('./data/guides.json');if(!response.ok)throw Error('guides.json missing');const data=await response.json();return Array.isArray(data)?data:fallback;}
 catch {return fallback;}
}
