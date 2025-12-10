#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    unordered_map<string,int> scores;

    // Add precomputed values
    scores["Alice"] = 95;
    scores["Bob"] = 88;

    // Fast retrieval O(1)
    cout << "Alice's score: " << scores["Alice"] << endl;
    cout << "Bob's score: " << scores["Bob"] << endl;

    return 0;
}
