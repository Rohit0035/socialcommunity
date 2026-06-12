"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

const CommentsTab = () => {
    const [filterModal, setFilterModal] = useState(false);
    const [sortOrder, setSortOrder] = useState("newest");

    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const [dateRange, setDateRange] = useState({
        from: "",
        to: "",
    });

    const [comments, setComments] = useState([
        {
            id: 1,
            username: "rahul_verma",
            text: "Pyar Dikhave ka mohtaj nahi hota, Aur Jo chhipane se chhip jaye vo Pyar nahi hota.....",
            timeAgo: "7y",
            date: "2025-06-01",
            avatar: "https://i.pravatar.cc/150?img=11",
            src: "https://picsum.photos/100?random=11",
        },
        {
            id: 2,
            username: "amit_sharma",
            text: "Nice bhai",
            timeAgo: "6y",
            date: "2025-05-20",
            avatar: "https://i.pravatar.cc/150?img=12",
            src: "https://picsum.photos/100?random=12",
        },
        {
            id: 3,
            username: "rohit_singh",
            text: "#PHOTOGRAPHY",
            timeAgo: "8y",
            date: "2025-04-10",
            avatar: "https://i.pravatar.cc/150?img=13",
            src: "https://picsum.photos/100?random=13",
        },
        {
            id: 4,
            username: "vikas_gupta",
            text: '"what a look" bro',
            timeAgo: "8y",
            date: "2025-03-11",
            avatar: "https://i.pravatar.cc/150?img=14",
            src: "https://picsum.photos/100?random=14",
        },
    ]);

    const toggleSelectionMode = () => {
        if (selectionMode) {
            setSelectedItems([]);
        }

        setSelectionMode(!selectionMode);
    };

    const handleSelectItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const handleDelete = () => {
        setComments((prev) =>
            prev.filter(
                (item) => !selectedItems.includes(item.id)
            )
        );

        setSelectedItems([]);
        setSelectionMode(false);
    };

    const filteredComments = useMemo(() => {
        let data = [...comments];

        if (dateRange.from) {
            data = data.filter(
                (item) => item.date >= dateRange.from
            );
        }

        if (dateRange.to) {
            data = data.filter(
                (item) => item.date <= dateRange.to
            );
        }

        data.sort((a, b) =>
            sortOrder === "newest"
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        );

        return data;
    }, [comments, sortOrder, dateRange]);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">

                <h6 className="mb-0 fw-semibold small">
                    {sortOrder === "newest"
                        ? "Newest to oldest"
                        : "Oldest to newest"}
                </h6>

                <div className="d-flex align-items-center gap-2">

                    <Button
                        color="light"
                        className="border btn-sm"
                        onClick={() => setFilterModal(true)}
                    >
                        Sort & Filter
                    </Button>

                    <Button
                        color="link"
                        className="text-decoration-none btn-sm"
                        onClick={toggleSelectionMode}
                    >
                        {selectionMode ? "Cancel" : "Select"}
                    </Button>

                </div>

            </div>

            <div className="border rounded overflow-hidden bg-white">

                {filteredComments.map((item) => (
                    <div
                        key={item.id}
                        className="d-flex justify-content-between align-items-start px-3 py-3 border-bottom"
                        onClick={() =>
                            selectionMode && handleSelectItem(item.id)
                        }
                        style={{
                            cursor: selectionMode ? "pointer" : "default",
                        }}
                    >
                        <div className="d-flex gap-3 flex-grow-1">
                            <div className="">
                                <Image
                                    src={item.avatar}
                                    alt={item.username}
                                    width={45}
                                    height={45}
                                    className="rounded-circle"
                                />
                            </div>



                            <div className="flex-grow-1">

                                <div className="fw-semibold">
                                    {item.username}
                                </div>

                                <div className="small">
                                    {item.text}
                                </div>

                                <small className="text-muted">
                                    {item.timeAgo}
                                </small>

                            </div>

                        </div>

                        <div className="d-flex align-items-center gap-3">

                            <Image
                                src={item.src}
                                alt=""
                                width={50}
                                height={50}
                                className="rounded"
                            />

                            {selectionMode && (
                                <Input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() =>
                                        handleSelectItem(item.id)
                                    }
                                    onClick={(e) =>
                                        e.stopPropagation()
                                    }
                                />
                            )}

                        </div>
                    </div>
                ))}

            </div>

            {selectionMode && (
                <div className="d-flex justify-content-between align-items-center border rounded mt-3 px-3 py-2">

                    <span className="fw-medium">
                        {selectedItems.length} selected
                    </span>

                    <Button
                        color="link"
                        className="text-danger text-decoration-none p-0"
                        disabled={!selectedItems.length}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>

                </div>
            )}

            <Modal
                isOpen={filterModal}
                toggle={() => setFilterModal(false)}
                centered
            >
                <ModalHeader toggle={() => setFilterModal(false)}>
                    Sort & Filter
                </ModalHeader>

                <ModalBody>

                    <FormGroup>
                        <Label>Sort Order</Label>

                        <Input
                            type="select"
                            value={sortOrder}
                            onChange={(e) =>
                                setSortOrder(e.target.value)
                            }
                        >
                            <option value="newest">
                                Newest First
                            </option>

                            <option value="oldest">
                                Oldest First
                            </option>
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>From Date</Label>

                        <Input
                            type="date"
                            value={dateRange.from}
                            onChange={(e) =>
                                setDateRange({
                                    ...dateRange,
                                    from: e.target.value,
                                })
                            }
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>To Date</Label>

                        <Input
                            type="date"
                            value={dateRange.to}
                            onChange={(e) =>
                                setDateRange({
                                    ...dateRange,
                                    to: e.target.value,
                                })
                            }
                        />
                    </FormGroup>

                </ModalBody>

                <ModalFooter>

                    <Button
                        color="secondary"
                        onClick={() => {
                            setSortOrder("newest");
                            setDateRange({
                                from: "",
                                to: "",
                            });
                        }}
                    >
                        Reset
                    </Button>

                    <Button
                        color="primary"
                        onClick={() =>
                            setFilterModal(false)
                        }
                    >
                        Apply
                    </Button>

                </ModalFooter>
            </Modal>
        </>
    );
};

export default CommentsTab;