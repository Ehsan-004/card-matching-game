export const EMOJIES = [
    "🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍑", "🍍",
    "🥝", "🍐", "🥥", "🍋", "🍊", "🫐", "🥭", "🍈",
    "🍔", "🍕", "🌭", "🍟", "🌮", "🌯", "🍿", "🧀",
    "🥨", "🥐", "🍩", "🍪", "🧁", "🍰", "🍫", "🍬",
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
    "🐸", "🐵", "🐧", "🦄", "🐝", "🐙", "🦋", "🐢",
    "⚽", "🏀", "🏈", "🎾", "🎱", "🏓", "🏸", "🥊",
    "🎮", "🎲", "🎯", "🎪", "🎨", "🎭", "🎧", "📱"
];

export function createMemoryGrid(chars, gridSize) {
    const totalCells = gridSize * gridSize;

    if (totalCells % 2 !== 0) {
        throw new Error("تعداد خانه‌ها باید زوج باشد");
    }

    const pairsNeeded = totalCells / 2;

    if (chars.length < pairsNeeded) {
        throw new Error("کاراکتر کافی وجود ندارد");
    }

    const selected = chars
        .sort(() => Math.random() - 0.5)
        .slice(0, pairsNeeded);

    const paired = selected.flatMap(char => [char, char]);

    const shuffled = paired.sort(() => Math.random() - 0.5);

    return shuffled.map((char, index) => ({
        id: index + 1,
        value: char,
        flipped: false,
        matched: false,
    }));
}