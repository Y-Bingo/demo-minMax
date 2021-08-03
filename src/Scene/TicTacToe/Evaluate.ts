const SCORE_TABLE = {
	'000': 1,
	'100': 10,
	'110': 100,
	'111': 1000,
};

/**
 * 评分系数
 */
export enum EScoreTable {
	NONE = 1,
	ONE = 10,
	TWO = 100,
	THREE = 1000,
	BLOCK = -100,
}

export function countToScore(count: number, block: number, empty?: number): number {
	if (block > 0) return EScoreTable.BLOCK;
	switch (count) {
		case 1:
			return EScoreTable.ONE;
		case 2:
			return EScoreTable.TWO;
		case 3:
			return EScoreTable.THREE;
	}
	return EScoreTable.NONE;
}

/**
 *
 * @param n
 */
export function evaluateLine(n: any[], type: any): number {
	let count = 0;
	let block = 0;
	let empty = 0;
	for (let i = 0; i < n.length; i++) {
		if (n[i] === '0') {
			empty++;
		} else if (n[i] === type) {
			count++;
		} else {
			block++;
		}
	}
	return countToScore(count, block, empty);
}

export function evaluateBoard(board: any[][], type: any, maxCombo: number): number {
	let score = 0;
	const rows = board.length;
	const cols = board[0].length;
	const n = [];
	//【|】 垂直方向遍历
	console.log('=====  垂直  =====');
	for (let col = 0; col < cols; col++) {
		for (let row = 0; row <= rows - maxCombo; row++) {
			for (let i = 0; i < maxCombo; i++) {
				n[i] = board[row + i][col];
			}
			score += evaluateLine(n, type);
			console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
		}
	}
	//【——】水平方向遍历
	console.log('=====  水平  =====');
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col <= cols - maxCombo; col++) {
			for (let i = 0; i < maxCombo; i++) {
				n[i] = board[row][col + i];
			}
			score += evaluateLine(n, type);
			console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
		}
	}

	//【\】 正对角方向遍历 左上 -> 右下
	console.log('===== 正对角 =====');
	for (let row = 0; row <= rows - maxCombo; row++) {
		for (let col = 0; col <= cols - maxCombo; col++) {
			for (let i = 0; i < maxCombo; i++) {
				n[i] = board[row + i][col + i];
			}
			score += evaluateLine(n, type);
			console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
		}
	}

	//【/】反对角方向遍历 右上 -> 左下
	console.log('===== 反对角 =====');
	for (let row = rows - 1; row >= maxCombo - 1; row--) {
		for (let col = cols - 1; col >= maxCombo - 1; col--) {
			for (let i = 0; i < maxCombo; i++) {
				n[i] = board[row - i][col - i];
			}
			score += evaluateLine(n, type);
			console.log(`【${row},${col}】:${evaluateLine(n, type)}`);
		}
	}

	return score;
}