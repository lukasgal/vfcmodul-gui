import { en, de, Faker } from "@faker-js/faker";
import { VFCType } from "./store";
import { VFCObject } from "./@types";
const faker = new Faker({
	locale: [en, de],
});

const createRandomVfc = (type: VFCType) => () => {
	const vfcId = faker.airline.flightNumber({
		addLeadingZeros: true,
		length: { min: 4, max: 6 },
	});
	const parentVfcId = faker.airline.flightNumber({
		addLeadingZeros: true,
		length: { min: 4, max: 6 },
	});

	const path = parentVfcId + "/" + vfcId;
	return {
		active: true,
		vfcId,
		parentVfcId,
		descLong: faker.music.songName(),
		module: "",
		path,
		selectable: faker.helpers.weightedArrayElement([
			{ weight: 10, value: true },
			{ weight: 3, value: false },
		]),
		vfcType: type,
		visualVfcId: faker.airline.flightNumber({
			addLeadingZeros: true,
			length: { min: 4, max: 6 },
		}),
	};
};

const typeToSeed: { [key: string]: number } = {
	[VFCType.FA]: 1,
	[VFCType.FO_K]: 2,
	[VFCType.FO_F]: 3,
	[VFCType.FL_F]: 4,
	[VFCType.FL_O]: 5,
	[VFCType.FB]: 6,
};

export const randomVFC: (type: VFCType) => VFCObject[] = (type) => {
	const seed = typeToSeed[type] * 14;
	faker.seed(seed);
	return faker.helpers.multiple(createRandomVfc(type), {
		count: {
			min: 20,
			max: seed * 4,
		},
	});
};
