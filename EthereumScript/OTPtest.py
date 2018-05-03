import smtplib
import random
import time
import datetime 
import sys
'''
Current_time = datetime.datetime.now().time()
Post_time =  Current_time + datetime.timedelta(seconds=900)
print Post_time
'''

email_ID_to_send = sys.argv[1]

OTPlist = []
for p in range(1000, 9999):
    for i in range(2, p):
        if p % i == 0:
            break
    else:
        OTPlist.append(p)




OTP = random.choice(OTPlist)
print OTP

OTP_email = (str(OTP))
''



def sendemail(from_addr, to_addr_list, cc_addr_list,
              subject, message,
              login, password,
              smtpserver='smtp.gmail.com:587'):
    header  = 'From: %s\n' % from_addr
    header += 'To: %s\n' % ','.join(to_addr_list)
    header += 'Cc: %s\n' % ','.join(cc_addr_list)
    header += 'Subject: %s\n\n' % subject
    message = header + message
 
    server = smtplib.SMTP(smtpserver)
    server.starttls()
    server.login(login,password)
    problems = server.sendmail(from_addr, to_addr_list, message)
    server.quit()
    return problems


sendemail(from_addr    = 'one.time.pw.system@gmail.com', 
          to_addr_list = [email_ID_to_send],
          cc_addr_list = ['aanshul.aggarwal@gmail.com'], 
          subject      = 'OTP', 
          message      = 'Your OTP is ' + OTP_email, 
          login        = 'one.time.pw.system@gmail.com', 
          password     = 'fyp@ust.hk')

