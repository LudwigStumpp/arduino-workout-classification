let storage = null;

const app = new Vue({
    el: '#app',
    data: {
        delta: 0.2,
        noExercise: 'uncertain',
        log: '',
        tracker: {},
        serviceUUID: '',
        isConnected: false,
        isRecording: false,
        myCharacteristic: null,
        myBLE: null,
    },
    created() {
        this.myBLE = new p5ble();
    },
    computed: {
        hasTrackingData: function () {
            dict = this.tracker;
            return Object.keys(dict).length > 0;
        },
    },
    mounted: function () {
    },
    methods: {
        connectBLE: function () {
            this.myBLE.connect(this.serviceUUID, this.gotCharacteristics);
        },
        disconnectBLE: function () {
            this.myBLE.disconnect();
            this.isConnected = this.myBLE.isConnected();
        },
        gotCharacteristics: function (error, characteristics) {
            if (error) console.log('error: ', error);
            this.myCharacteristic = characteristics[0];

            this.isConnected = this.myBLE.isConnected();
            this.myBLE.onDisconnected(this.disconnectBLE);

            this.myBLE.startNotifications(this.myCharacteristic, this.handleNotifications, 'string');
        },
        handleNotifications: function (data) {
            this.log = data;
            if (this.isRecording && data != this.noExercise) {
                if (data in this.tracker) {
                    curr = this.tracker[data];
                    this.tracker[data] = Math.round((curr + parseFloat(this.delta)) * 10) / 10;
                } else {
                    Vue.set(this.tracker, data, parseFloat(this.delta));
                }
            }
        },
        startRecording: function () {
            this.isRecording = true;
        },
        stopRecording: function () {
            this.isRecording = false;
        },
        resetRecording: function () {
            this.isRecording = false;
            this.tracker = {};
        },
        downloadData: function () {
            let rows = [];
            rows[0] = Object.keys(this.tracker);
            rows[1] = Object.values(this.tracker);
            const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "workout_data.csv");
            document.body.appendChild(link); // Required for FF
            link.click();
        }
    }
})