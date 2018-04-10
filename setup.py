import os


def make_dir(name):
    if not os.path.isdir(name):
        print('Creating dir: {}'.format(name))
        os.mkdir(name)


dirList = [
    './public/data',
    './public/data/csvs',
    './public/data/uploads'
]

# Create the necessary directories
for d in dirList:
    make_dir(d)

# Install all necessary node packages
os.system('npm install')
