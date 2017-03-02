import mraa
import time
import sys

x = mraa.Gpio(3)
x.dir(mraa.DIR_OUT)
# x.period_us(700)
# x.enable(True)
# value=1;

#while True:
    # data = sys.stdin.readlines()
    # print(data)
    # data1 =int(data)

    # if data==1:
for y in range(0,1):
    x.write(1)
    print('ON')
    time.sleep(0.15)
    x.write(0)
    print('OFF')
    time.sleep(0.15)