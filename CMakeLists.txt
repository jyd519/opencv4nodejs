cmake_minimum_required(VERSION 3.28)
cmake_policy(SET CMP0091 NEW)
cmake_policy(SET CMP0042 NEW)

project (opencv4)

set(CMAKE_CXX_VISIBILITY_PRESET hidden)
set(CMAKE_VISIBILITY_INLINES_HIDDEN 1)
set(CMAKE_EXPORT_COMPILE_COMMANDS 1)
set(CMAKE_CXX_STANDARD 17)

if (WIN32)
  set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")
  add_compile_definitions(UNICODE _UNICODE)
endif()

find_package(OpenCV)

set(SOURCE_FILES
			"cc/opencv4nodejs.cc"
			"cc/CustomMatAllocator.cc"
			"cc/ExternalMemTracking.cc"
			"cc/core/core.cc"
			"cc/core/coreConstants.cc"
			"cc/core/HistAxes.cc"
			"cc/core/Mat.cc"
			"cc/core/Point.cc"
			"cc/core/Vec.cc"
			"cc/core/Size.cc"
			"cc/core/Rect.cc"
			"cc/core/RotatedRect.cc"
			"cc/core/TermCriteria.cc"
			"cc/imgproc/imgproc.cc"
			"cc/imgproc/imgprocConstants.cc"
			"cc/imgproc/MatImgproc.cc"
			"cc/imgproc/Contour.cc"
			"cc/imgproc/Moments.cc"
			"cc/calib3d/calib3d.cc"
			"cc/calib3d/calib3dConstants.cc"
			"cc/calib3d/MatCalib3d.cc"
			"cc/io/io.cc"
			"cc/io/ioConstants.cc"
			"cc/io/VideoCapture.cc"
			"cc/io/VideoWriter.cc"
			"cc/photo/photo.cc"
			"cc/photo/photoConstants.cc"
			"cc/photo/MatPhoto.cc"
			"cc/video/video.cc"
			"cc/video/BackgroundSubtractor.cc"
			"cc/video/BackgroundSubtractorMOG2.cc"
			"cc/video/BackgroundSubtractorKNN.cc"
			"cc/ximgproc/ximgproc.cc"
			"cc/ximgproc/MatXimgproc.cc"
			"cc/ximgproc/SuperpixelSEEDS.cc"
			"cc/ximgproc/SuperpixelSLIC.cc"
			"cc/ximgproc/SuperpixelLSC.cc"
			"cc/objdetect/objdetect.cc"
			"cc/objdetect/CascadeClassifier.cc"
			"cc/objdetect/HOGDescriptor.cc"
			"cc/objdetect/DetectionROI.cc"
			"cc/machinelearning/machinelearning.cc"
			"cc/machinelearning/machinelearningConstants.cc"
			"cc/machinelearning/ParamGrid.cc"
			"cc/machinelearning/StatModel.cc"
			"cc/machinelearning/SVM.cc"
			"cc/machinelearning/TrainData.cc"
			"cc/dnn/dnn.cc"
			"cc/dnn/Net.cc"
			"cc/face/face.cc"
			"cc/face/FaceRecognizer.cc"
			"cc/face/EigenFaceRecognizer.cc"
			"cc/face/FisherFaceRecognizer.cc"
			"cc/face/LBPHFaceRecognizer.cc"
			"cc/face/Facemark.cc"
			"cc/face/FacemarkAAM.cc"
			"cc/face/FacemarkAAMData.cc"
			"cc/face/FacemarkAAMParams.cc"
			"cc/face/FacemarkLBF.cc"
			"cc/face/FacemarkLBFParams.cc"
			"cc/text/text.cc"
			"cc/text/OCRHMMClassifier.cc"
			"cc/text/OCRHMMDecoder.cc"
			"cc/tracking/tracking.cc"
			"cc/tracking/Tracker.cc"
			"cc/tracking/MultiTracker.cc"
			"cc/tracking/Trackers/TrackerBoosting.cc"
			"cc/tracking/Trackers/TrackerBoostingParams.cc"
			"cc/tracking/Trackers/TrackerKCF.cc"
			"cc/tracking/Trackers/TrackerKCFParams.cc"
			"cc/tracking/Trackers/TrackerMIL.cc"
			"cc/tracking/Trackers/TrackerMILParams.cc"
			"cc/tracking/Trackers/TrackerMedianFlow.cc"
			"cc/tracking/Trackers/TrackerTLD.cc"
			"cc/tracking/Trackers/TrackerGOTURN.cc"
			"cc/tracking/Trackers/TrackerCSRT.cc"
			"cc/tracking/Trackers/TrackerCSRTParams.cc"
			"cc/tracking/Trackers/TrackerMOSSE.cc"
			"cc/features2d/features2d.cc"
			"cc/features2d/KeyPoint.cc"
			"cc/features2d/KeyPointMatch.cc"
			"cc/features2d/DescriptorMatch.cc"
			"cc/features2d/BFMatcher.cc"
			"cc/features2d/FeatureDetector.cc"
			"cc/features2d/descriptorMatching.cc"
			"cc/features2d/descriptorMatchingKnn.cc"
			"cc/features2d/detectors/AGASTDetector.cc"
			"cc/features2d/detectors/AKAZEDetector.cc"
			"cc/features2d/detectors/BRISKDetector.cc"
			"cc/features2d/detectors/FASTDetector.cc"
			"cc/features2d/detectors/GFTTDetector.cc"
			"cc/features2d/detectors/KAZEDetector.cc"
			"cc/features2d/detectors/MSERDetector.cc"
			"cc/features2d/detectors/ORBDetector.cc"
			"cc/features2d/detectors/SimpleBlobDetector.cc"
			"cc/features2d/detectors/SimpleBlobDetectorParams.cc"
			"cc/xfeatures2d/xfeatures2d.cc"
			"cc/xfeatures2d/SIFTDetector.cc"
			"cc/xfeatures2d/SURFDetector.cc"
			"cc/img_hash/img_hash.cc"
			"cc/img_hash/ImgHashBase.cc"
			"cc/img_hash/PHash.cc"
			"cc/highgui/highgui.cc"
			"cc/highgui/highguiConstants.cc"
  )

include_directories(${CMAKE_JS_INC})

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

target_include_directories(${PROJECT_NAME} PRIVATE
			"cc"
			"cc/core"
      "./node_modules/nan"
			"cc/native-node-utils"
)

if (WIN32)
  target_compile_definitions(${PROJECT_NAME} PRIVATE
        "WIN"
        "_HAS_EXCEPTIONS=1"
  )
endif()

target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB} opencv::opencv)

if(MSVC AND CMAKE_JS_NODELIB_DEF AND CMAKE_JS_NODELIB_TARGET)
  # Generate node.lib
  execute_process(COMMAND ${CMAKE_AR} /def:${CMAKE_JS_NODELIB_DEF} /out:${CMAKE_JS_NODELIB_TARGET} ${CMAKE_STATIC_LINKER_FLAGS})
endif()


if (DEFINED  opencv_opencv_world_BIN_DIRS_RELEASE)
  file(GLOB OPENCV_BIN_FILES "${opencv_opencv_world_BIN_DIRS_RELEASE}/*.dll")
  message(info "Copy ${OPENCV_BIN_FILES} to $<TARGET_FILE_DIR:${PROJECT_NAME}>")
  add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
      COMMAND ${CMAKE_COMMAND} -E copy_if_different ${OPENCV_BIN_FILES} $<TARGET_FILE_DIR:${PROJECT_NAME}>
      DEPENDS $<TARGET_FILE_DIR:${PROJECT_NAME}>/${PROJECT_NAME}.node
    )
else()
  message(FATAL "opencv_opencv_world_BIN_DIRS_RELEASE not set")
endif()
