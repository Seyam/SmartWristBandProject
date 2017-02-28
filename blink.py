import mraa
import time
import sys

x = mraa.Gpio(3)
x.dir(mraa.DIR_OUT)
# x.period_us(700)
# x.enable(True)
# value=1;

while True:
    data = sys.stdin.readlines()
    # data =int(data)

    if data=='1':
	    x.write(1)
	    print('ON')
	    time.sleep(1)
	    x.write(0)
	    print('OFF')
	    time.sleep(1)