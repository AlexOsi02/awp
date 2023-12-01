package com.company;

public class Main {
    public static void main(String[] args) {
        // Создаем семафор с лимитом 3 потока и временным лимитом 2000 миллисекунд (2 секунды)
        CustomSemaphore customSemaphore = new CustomSemaphore(3, 2000);

        // Создаем и запускаем несколько потоков
        for (int i = 1; i <= 5; i++) {
            Thread thread = new Thread(new Worker(i, customSemaphore));
            thread.start();
        }
    }

    static class Worker implements Runnable {
        private final int id;
        private final CustomSemaphore semaphore;

        public Worker(int id, CustomSemaphore semaphore) {
            this.id = id;
            this.semaphore = semaphore;
        }

        @Override
        public void run() {
            try {
                System.out.println("Thread " + id + " trying to acquire semaphore.");
                semaphore.acquire();

                System.out.println("Thread " + id + " acquired semaphore. Doing some work...");

                // Simulate some work
                Thread.sleep(1000);

                System.out.println("Thread " + id + " releasing semaphore.");
                semaphore.release();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

