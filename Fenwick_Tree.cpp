#include <iostream>
#include <vector>
using namespace std;

class FenwickTree {
    vector<int> tree;
    int n;
public:
    FenwickTree(int size) : n(size) { tree.assign(n+1,0); }

    void update(int index, int value) {
        for(; index<=n; index += index & -index)
            tree[index] += value;
    }

    int query(int index) {
        int sum=0;
        for(; index>0; index -= index & -index)
            sum += tree[index];
        return sum;
    }
};

int main() {
    int n=10;
    FenwickTree ft(n);
    ft.update(1,5);
    ft.update(3,7);
    ft.update(5,6);

    cout << "Prefix sum up to 5: " << ft.query(5) << endl;
    cout << "Prefix sum up to 3: " << ft.query(3) << endl;

    return 0;
}
