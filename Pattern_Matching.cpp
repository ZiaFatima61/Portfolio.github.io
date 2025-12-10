#include <iostream>
#include <vector>
using namespace std;

// Simple pattern matching example
vector<int> patternSearch(string text, string pattern){
    vector<int> positions;
    int n = text.size(), m = pattern.size();
    for(int i=0;i<=n-m;i++){
        int j;
        for(j=0;j<m;j++)
            if(text[i+j]!=pattern[j]) break;
        if(j==m) positions.push_back(i);
    }
    return positions;
}

int main() {
    string text = "ABABDABACDABABCABAB";
    string pattern = "ABABCABAB";

    vector<int> matches = patternSearch(text, pattern);
    cout << "Pattern found at positions: ";
    for(int pos : matches) cout << pos << " ";
    cout << endl;
    return 0;
}
