#include <iostream>
#include <vector>
using namespace std;

void mergeSort(vector<int>& arr, int l, int r);
void quickSort(vector<int>& arr, int low, int high);
void heapSort(vector<int>& arr);

int main() {
    vector<int> data = {5, 2, 9, 1, 5, 6};

    // Example: Merge Sort
    mergeSort(data, 0, data.size()-1);

    cout << "Sorted Array: ";
    for(int x : data) cout << x << " ";
    cout << endl;

    return 0;
}

// Implement Merge Sort
void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m-l+1, n2 = r-m;
    vector<int> L(n1), R(n2);
    for(int i=0;i<n1;i++) L[i]=arr[l+i];
    for(int i=0;i<n2;i++) R[i]=arr[m+1+i];
    int i=0,j=0,k=l;
    while(i<n1 && j<n2){
        if(L[i]<=R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while(i<n1) arr[k++] = L[i++];
    while(j<n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if(l<r){
        int m = l + (r-l)/2;
        mergeSort(arr,l,m);
        mergeSort(arr,m+1,r);
        merge(arr,l,m,r);
    }
}

// Quick Sort
int partition(vector<int>& arr, int low, int high){
    int pivot = arr[high], i=low-1;
    for(int j=low;j<high;j++){
        if(arr[j]<=pivot) swap(arr[++i], arr[j]);
    }
    swap(arr[i+1], arr[high]);
    return i+1;
}
void quickSort(vector<int>& arr, int low, int high){
    if(low<high){
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi-1);
        quickSort(arr, pi+1, high);
    }
}

// Heap Sort
void heapify(vector<int>& arr, int n, int i){
    int largest = i, l = 2*i+1, r=2*i+2;
    if(l<n && arr[l]>arr[largest]) largest = l;
    if(r<n && arr[r]>arr[largest]) largest = r;
    if(largest!=i){
        swap(arr[i], arr[largest]);
        heapify(arr,n,largest);
    }
}
void heapSort(vector<int>& arr){
    int n=arr.size();
    for(int i=n/2-1;i>=0;i--) heapify(arr,n,i);
    for(int i=n-1;i>0;i--){
        swap(arr[0], arr[i]);
        heapify(arr,i,0);
    }
}
