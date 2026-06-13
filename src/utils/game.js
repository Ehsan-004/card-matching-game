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

    // انتخاب کاراکترها
    const selected = chars
        .sort(() => Math.random() - 0.5)
        .slice(0, pairsNeeded);

    // ساخت جفت‌ها
    const paired = selected.flatMap(char => [char, char]);

    // مخلوط کردن
    const shuffled = paired.sort(() => Math.random() - 0.5);

    // ساخت آرایه آبجکت‌ها
    return shuffled.map((char, index) => ({
        id: index + 1,
        value: char,
        flipped: false,
        matched: false,
    }));
}