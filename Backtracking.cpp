#include <iostream>
using namespace std;

// Example: N-Queens problem (can be adapted for step-by-step hints)
bool isSafe(int board[], int row, int col, int n){
    for(int i=0;i<row;i++)
        if(board[i]==col || abs(board[i]-col)==row-i) return false;
    return true;
}

void solveNQueens(int board[], int row, int n){
    if(row==n){
        for(int i=0;i<n;i++) cout << board[i] << " ";
        cout << endl;
        return;
    }
    for(int col=0;col<n;col++){
        if(isSafe(board,row,col,n)){
            board[row]=col;
            solveNQueens(board,row+1,n);
        }
    }
}

int main() {
    int n = 4;
    int board[4];
    solveNQueens(board,0,n);
    return 0;
}
