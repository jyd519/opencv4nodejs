.PHONY: x64 x32

x64:
		cmake-js -O build64 --CDCMAKE_TOOLCHAIN_FILE=build64/conan_toolchain.cmake


v15:
		cmake-js -a ia32 --CDCMAKE_TOOLCHAIN_FILE=E:\lab\media\opencv4nodejs\build\conan_toolchain.cmake	--runtime=electron --runtime-version=15.4.0

v22:
		cmake-js -a ia32 --CDCMAKE_TOOLCHAIN_FILE=E:\lab\media\opencv4nodejs\build\conan_toolchain.cmake	--runtime=electron --runtime-version=22.3.27
